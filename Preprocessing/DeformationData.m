function [Axial,Lateral,strainA,strainL] = DeformationData(Im1,Im2,IRF1,IRF2,IA1,IA2,midA,alfa,beta,gamma,T,fs,f0,smth,name)

%%
IRF = [-30 0]; % Maximum allowed disparity in axial D
IA = [-1 1]; % Maximum allowed disparity in lateral D
% midA = 20;
% alfa = 5; %axial regularization
% beta = 20; %lateral regularization
% gamma = 0.005; %lateral regularization 
% T = .02; % threshold for IRLS
maxIm = max(Im1(:));
Im1 = Im1/maxIm;
Im2 = Im2/maxIm;
a_t = 0.63;
f0=10;
fs=40;
% f0 = hrf1.rfsd(1,1).TxFrequencyMhz/1e6; %ultrasound center freq. in MHz
xx = calc_att (a_t, f0, fs); % to compensate for attenuation
% xx= 1;
alfa_DP = 0.2; % DP regularization weight
% IRF = [IRF1 IRF2];
% IA = [IA1 IA2];
[ax0, lat0, ~] = RCF_AM2D(Im1, Im2, IRF, IA, midA, alfa_DP, alfa, beta, gamma, T, xx);
% the disp. of the first 40 and last 40 samples is not calculated in AM2D: 
% the disp. of the first 10 and last 10 A-lines is not calculated in AM2D:
Axial = ax0(41:end-40, 16:end-15);
Lateral = lat0(41:end-40, 16:end-15);
Im1 = Im1(41:end-40, 16:end-15);
Im2 = Im2(41:end-40, 16:end-15);
% ------------------------------------------------------- %
% ---------- accurate displacements using GLUE ---------- %
% ------------------------------------------------------- %
alfa1 = smth ; % regularization coefficients
alfa2 = 1 ;
beta1 = smth ; 
beta2 = 1 ;
tic
[Axial, Lateral] = GLUE (Axial, Lateral, Im1, Im2, alfa1, alfa2, beta1, beta2);
toc
% strainA = 0;
% strainL = 0;
f=figure; imagesc((Axial)), colorbar, title('Axial Displacement'), colormap(hot);
st = strcat(name,'_DAx_');
save(st,'Axial');
saveas(f,st,'png');
f=figure; imagesc((Lateral)), colorbar, title('Lateral Displacement'), colormap(hot);
st = strcat(name,'_DLat_');
save(st,'Lateral');
saveas(f,st,'png');
% % ---------------------------------------------------- %
% % ------------ Calculating Strain from Disp ---------- %
% % ---------------------------------------------------- %
% % axial strain
wDIff = 3; % window length of the differentiation kernel
strainA = LSQ(Axial,wDIff);
strainA = -strainA((wDIff+1)/2:end-(wDIff-1)/2,(wDIff+1)/2:end-(wDIff-1)/2);
% strainA(strainA<0) = 1.001;
% strainA(strainA<2e-2) = 2e-2;
% % [strainA,strainL] = StrainCalc(xRat,yRat,dsl,dsd,Axial,Lateral);
f=figure; imagesc(abs(strainA)), colorbar, title('Axial Strain'), colormap(gray);%caxis([0 0.03]);
st = strcat(name,'_SAx_');
save(st,'strainA');
saveas(f,st,'png');
% % lateral strain:
% % wDIff = 37; % window length of the differentiation kernel
strainL = LSQ(Lateral',wDIff);
strainL = strainL((wDIff+1)/2:end-(wDIff-1)/2,(wDIff+1)/2:end-(wDIff-1)/2)';
% strainL(strainL<-0.002) = -0.002;
% strainL(strainL>.043) = .043;
f=figure; imagesc((strainL)), colorbar, title('Lateral Strain'), colormap(gray);%caxis([0 0.03]);
st = strcat(name,'_SLat_');
save(st,'strainL');
saveas(f,st,'png');
close all
end

