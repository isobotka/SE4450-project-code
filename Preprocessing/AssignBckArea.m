function [BackgroundArea,RingArea] = AssignBckArea(TumorArea,dims)
% Calculates Background Area based on the tumor boundaries
%  Author: Niusha Kheirkhah

xRat = dims{5};
yRat = dims{6};
c = 1;
TumorArea2 = TumorArea;
for i = 2 : size(TumorArea,1)-1
    for j =  2 : size(TumorArea,2)-1
        if(TumorArea(i-1,j) ~= TumorArea(i,j) || TumorArea(i+1,j) ~= TumorArea(i,j) || ...
                TumorArea(i,j-1) ~= TumorArea(i,j) || TumorArea(i,j+1) ~= TumorArea(i,j))
            TumOut(c,1) = i;
            TumOut(c,2) = j;
            TumorArea2(i,j) = 1;
            c = c + 1;
        end
    end
end
minX = min(TumOut(:,2));
maxX = max(TumOut(:,2));
minY = min(TumOut(:,1));
maxY = max(TumOut(:,1));
radiX = (maxX - minX) / 2;
radiY = (maxY - minY) / 2;
cntX = (maxX + minX) / 2;
cntY = (maxY + minY) / 2;
radiM = (radiX*xRat + radiY*yRat) / 2;
RingArea = TumorArea2;
for k = 1:floor((radiM/3)/xRat)  
    for i = 13 : size(TumorArea,1)-12
        for j =  2 : size(TumorArea,2)-1
            if(TumorArea2(i-12,j) ~= TumorArea2(i,j) || TumorArea2(i+12,j) ~= TumorArea2(i,j) || ...
                    TumorArea2(i,j-1) ~= TumorArea2(i,j) || TumorArea2(i,j+1) ~= TumorArea2(i,j))
                RingArea(i,j) = 1;
            end
        end
    end
    TumorArea2 = RingArea;
end
BackgroundArea = TumorArea2;
for k = 1:floor((radiM)/xRat)  
    for i = 13 : size(TumorArea,1)-12
        for j =  2 : size(TumorArea,2)-1
            if(TumorArea2(i-12,j) ~= TumorArea2(i,j) || TumorArea2(i+12,j) ~= TumorArea2(i,j) || ...
                    TumorArea2(i,j-1) ~= TumorArea2(i,j) || TumorArea2(i,j+1) ~= TumorArea2(i,j))
                BackgroundArea(i,j) = 1;
            end
        end
    end
    TumorArea2 = BackgroundArea;
end
BackgroundArea = BackgroundArea - RingArea;

end

