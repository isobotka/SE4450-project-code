function [IEMat] = IEM(L,D,dx,dy)
%% Finite difference
difx = diffx1(L,D);
difx = difx / dx;
dify = diffy1(L,D);
dify = ElimRows(dify,L,D);
dify = dify / dy;
%% Incompressibility Equation constraint
IEMat = sparse([difx(1:end-(L-1),:),dify]);
end

