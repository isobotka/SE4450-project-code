function [mat] = diff2xy(L,D)

mat = sparse(zeros(1,(L)*(D)));

for i = 1:(D-2)*(L-2)
    off = (2*floor((i-1)/(L-2)))+1;
    
    mat(i,i+L+off-L-1) =  1;%i-1,j-1
    mat(i,i+L+off-L)   = -1;%i-1,j
    mat(i,i+L+off-1)   = -1;%i,j-1
    mat(i,i+L+off)     =  2;%i,j
    mat(i,i+L+off+1)   = -1;%i,j+1
    mat(i,i+L+off+L)   = -1;%i+1,j
    mat(i,i+L+off+L+1) =  1;%i+1,j+1

end


% dxy = sparse(zeros(1,L*W));
% i = 1;
% while i < L*W+1
%     for j = 1:L
%         dxy(i,i) = 2;
%         if(i - L > 0)
%             dxy(i,i-L) = -1;
%             if(j ~= 1)
%                 dxy(i,i-L-1) = 1;
%             end
%         end
%         if(j ~= 1)
%             dxy(i,i-1) = -1;
%         end
%         if(j ~= L)
%             dxy(i,i+1) = -1;
%         end
%         if(i + L < L*W+1)
%             dxy(i,i+L) = -1;
%             if(j ~= L)
%                 dxy(i,i+L+1) = 1;
%             end
%         end
%         i = i + 1;
%     end
% end     

end

