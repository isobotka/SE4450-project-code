function [mat] = ElimRows(mat,L,D)
counter = 0;
for i = 1:D-1
    mat(L*i-counter,:) = [];
    counter = counter + 1;
end

end

