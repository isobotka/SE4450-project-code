function [dif] = diffx1(L,W)

dif = sparse(zeros(1,L*W));
c = 1;
for i = 1 : W
    for j = 1 : L - 1
        dif(c,(i-1)*L+j) = -1; 
        dif(c,(i-1)*L+j+1) = 1;
        c = c + 1;
    end
end

end

