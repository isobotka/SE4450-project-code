function [CEMat] = CEM(L,D,dx,dy)
%% Finite difference
% flag = 'fin'
FD2D = diff2xy(L-1,D-1);
FD2D = FD2D / (dy*dx);
FD2D = -2 * FD2D;
% flag = 'fd2d'
%%
difx2 = diff2x((L-1),(D-1));
difx2 = difx2 / (dx*dx);
% flag = 'dfix2'
dify2 = diff2y((L-1),(D-1));
dify2 = dify2 / (dy*dy);
% flag = 'dify2'
%%
CEMat = [dify2,difx2,FD2D];      
end

