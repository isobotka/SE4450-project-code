function [mat2,dx,dy] = NiuDownSample(mat,xRat,yRat,ln2,dn2)

ln1 = size(mat,2);
dn1 = size(mat,1);
L = xRat * (ln1-1);
D = yRat * (dn1-1);

dx = L / (ln2-1);
dy = D / (dn2-1);

mat2 = 5000*ones(dn2,ln2);
xP = (dx/xRat);
yP = (dy/yRat);

% errAll = 0;

for i = 1:dn2
    for j = 1:ln2
        xn = (j - 1) * dx;
        yn = (i - 1) * dy;
        ii = (i - 1) * yP + 1;
        jj = (j - 1) * xP + 1;
        startPi = max(1,ceil(ii-yP+0.0001));
        endPi = min(dn1,floor(ii+yP-0.0001));
        startPj = max(1,ceil(jj-xP+0.0001));
        endPj = min(ln1,floor(jj+xP-0.0001));
        points = mat(startPi:endPi,startPj:endPj);
        AllPoints = points(:);
        n = size(AllPoints,1);
        XY = zeros(n,6);
        c = 1;
        if(n > 5)
            for m = startPi:endPi
                for k = startPj:endPj
                    x = (k-1) * xRat;
                    y = (m-1) * yRat;
                    XY(c,1) = x;
                    XY(c,2) = y;
                    XY(c,3) = x * y;
                    XY(c,4) = x ^ 2;
                    XY(c,5) = y ^ 2;
                    XY(c,6) = 1;
                    c = c + 1;
                end
            end
%             XY
            W = (((XY'*XY) + 0.0001*eye(6,6))\XY')*AllPoints;
            mat2(i,j) =[xn yn xn*yn xn^2 yn^2 1] * W;
%             err1 = norm(AllPoints - XY * W);
        elseif(n > 3)
            for m = startPi:endPi
                for k = startPj:endPj
                    x = (k-1) * xRat;
                    y = (m-1) * yRat;
                    XY(c,1) = x;
                    XY(c,2) = y;
                    XY(c,3) = x * y;
                    XY(c,4) = 1;
                    c = c + 1;
                end
            end
            W = (((XY'*XY) + 0.0001*eye(6,6))\XY')*AllPoints;
            mat2(i,j) = [xn yn xn*yn 1] * W;
%             err1 = norm(AllPoints - XY * W);
        elseif(n > 1)
            mat(i,j) = mean(AllPoints);
        elseif(n == 1)
            mat2(i,j) = AllPoints(1);
        end
        if(mat2(i,j) == 5000)
            disp('error in:')
            disp(i)
            disp(j)
        end
%         errAll = err1 + errAll;
    end
end
% err = errAll / (ln2 * dn2)
end

