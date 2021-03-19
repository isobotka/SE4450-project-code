function [dif1] = diffy1(L,D)

dif1 = sparse(zeros(L*(D-1),1));

for i = 1:(L*(D-1))
    dif1(i,i) = 1;
    dif1(i,i+L) = -1;
end

end

