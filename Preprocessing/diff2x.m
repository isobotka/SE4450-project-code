function [mat] = diff2x(L,D)

mat = sparse(zeros(1,(L)*(D)));

for i = 1:(D-2)*(L-2)
    off = (2*floor((i-1)/(L-2)))+1;
    mat(i,i+L+off-1)   = 1;
    mat(i,i+L+off) = -2;
    mat(i,i+L+off+1) = 1;
%     if(mod(i,L) == 1)
%         mat(i,i+2) = 1;
%     elseif(mod(i,L) == 0)
%         mat(i,i+1) = -2;
%     else
%         mat(i,i+1) = -2;
%         mat(i,i+2) = 1;
%     end
end
       
end

