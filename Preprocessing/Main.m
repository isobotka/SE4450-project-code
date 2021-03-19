%% Create Mat Files of Frames
% RfData = 'B82-S1-W0-ELASTTO-G600-D50-F30-STEP2.rf';
name = 'P39-W4-S6';     % Input the name of mat file here 
load(strcat(name,'.mat'));
L = 60;     %Length
D = 50;     %Depth
[rf1,dims] = BmodeVideo(rf1,name,L,D);
% endA = dims{1};
% endRF = dims{2};
% L = dims{3};
% D = dims{4};
xRat = dims{5};
yRat = dims{6};
startA = 1;
startRF = 1;
Im = rf1(:,:,2);
Im = Im/max(max(Im));
%% Load Mat file
name = 'P39-W4-S6';      % Input the name of mat file here 
load(strcat(name,'.mat'));
L = 60;
D = 50;
Im = rf1(:,:,1);
endA = size(Im,2);
endRF = size(Im,1);
startA = 1;
startRF = 1;
xRat = L / (endA-1);
yRat = D / (endRF-1);
endA = endA - 30;
endRF = endRF - 80;
L = endA * xRat;
D = endRF * yRat;
dims = {endA,endRF,L,D,xRat,yRat};
Im = Im/max(max(Im));
%% Display Bmode and Determine Tumour Boundaries
BMODE1 = log(abs(hilbert(Im))+.01);
Bmode_sameSize = BMODE1(43+22:end-42-23, 19:end-18);
dims{1} = size(Bmode_sameSize,2);   %endA
dims{2} = size(Bmode_sameSize,1);   %endRF
dims{3} = dims{1} * xRat;  %L
dims{4} = dims{2} * yRat; %D
f=figure;imagesc([0 1*(dims{1}-startA)],1*[startRF dims{2}],Bmode_sameSize);colormap(gray);
set(f, 'Position', [100 100 L*10 D*10])
hFH = imfreehand();
TumorArea = hFH.createMask();
xyTum = hFH.getPosition;
f=figure;imagesc([0 xRat*(dims{1}-startA)],yRat*[startRF dims{2}],Bmode_sameSize(:,:));colormap(gray);
set(f, 'Position', [100 100 L*10 D*10])
saveas(f,strcat(name,'-bmodeimage'),'png');
%% Assign Background Area
[BackgroundArea,RingArea] = AssignBckArea(TumorArea,dims);
[B] = bwboundaries(TumorArea);
Tumb = B{1};
[B] = bwboundaries(BackgroundArea);
Bckb = B{1};
[B] = bwboundaries(RingArea);
Rngb = B{1};
f=figure;imagesc([0 1*(dims{1}-startA)],1*[startRF dims{2}],Bmode_sameSize(:,:));colormap(gray);
set(f, 'Position', [100 100 L*10 D*10])
hold on
plot(Tumb(:,2), Tumb(:,1), 'r', 'LineWidth', 2)
hold on
plot(Bckb(:,2), Bckb(:,1), 'g', 'LineWidth', 2)
hold on
plot(Rngb(:,2), Rngb(:,1), 'g', 'LineWidth', 2)
xticklabels({})
yticklabels({})
saveas(f,strcat(name,'-tbo'),'png');
Bndrs = {Tumb, Bckb, Rngb};
%% Generating All Deformation Data
% Coefficients for the GLUE algorithm
IRF1 = -30;  %1  DON't CHANGE % Maximum allowed disparity in axial D
IRF2 = 0;    %2  DON't CHANGE
IA1 = -1;    %3  DON't CHANGE % Maximum allowed disparity in lateral D
IA2 = 1;     %4  DON't CHANGE
midA = 100;  %5  MAY CHANGE
alfa = 5;    %6  DON't CHANGE % Axial regularization
beta = 20;   %7  DON't CHANGE % Lateral regularization
gamma = 0.05;%8  DON't CHANGE % Lateral regularization
a_t = 0.63;  %9  DON't CHANGE % Compensate for attenuation
T = 0.01;    %10 DON't CHANGE % Threshold for IRLS
fs = 20;     %11 MAY CHANGE   % Ultrasound sampling freq. in MHz 
f0 = 10;     %12 MAY CHANGE   % Ultrasound center freq. in MHz   
smth = 5;    %13 DON't CHANGE % Degree of smoothness
coeffs = {IRF1,IRF2,IA1,IA2,midA,alfa,beta,gamma,a_t,T,fs,f0,smth};
n_interval = 5;
n_frames = size(rf1,3);
CreateAllDeformationData(name,n_interval,n_frames,coeffs,Bndrs,dims)
%% Generating Specific Deformation Data
ii = 13;
jj = 22;
maxA = 0.003;
maxL = 0.0002;
maxAL = {maxA , maxL};
IRF1 = -30;  %1  DON't CHANGE % Maximum allowed disparity in axial D
IRF2 = 0;    %2  DON't CHANGE
IA1 = -1;    %3  DON't CHANGE % Maximum allowed disparity in lateral D
IA2 = 1;     %4  DON't CHANGE
midA = 100;  %5  MAY CHANGE
alfa = 5;    %6  DON't CHANGE % Axial regularization
beta = 20;   %7  DON't CHANGE % Lateral regularization
gamma = 0.05;%8  DON't CHANGE % Lateral regularization
a_t = 0.63;  %9  DON't CHANGE % Compensate for attenuation
T = 0.01;    %10 DON't CHANGE % Threshold for IRLS
fs = 20;     %11 MAY CHANGE   % Ultrasound sampling freq. in MHz 
f0 = 10;     %12 MAY CHANGE   % Ultrasound center freq. in MHz   
smth = 5;    %13 DON't CHANGE % Degree of smoothness
coeffs = {IRF1,IRF2,IA1,IA2,midA,alfa,beta,gamma,a_t,T,fs,f0,smth};
[Axial,Lateral,strainA,strainL] = RedoDef(name,ii,jj,maxAL,coeffs,Bndrs,dims);
%% Downsampling Deformation Data
lelems = 220;       %Number of elements in length
welems = 200;       %Number of elements in width (depth)
[Axial_DS,~,~] = NiuDownSample(Axial,xRat,yRat,lelems+1,welems+1);
[Lateral_DS,~,~] = NiuDownSample(Lateral,xRat,yRat,lelems+1,welems+1);
[strainA_DS,dx,dy] = NiuDownSample(strainA,xRat,yRat,lelems,welems);
[strainL_DS,~,~] = NiuDownSample(strainL,xRat,yRat,lelems,welems);
[TumorArea_DS,~,~] = NiuDownSample(TumorArea,xRat,yRat,lelems,welems);
[BackgroundArea_DS,~,~] = NiuDownSample(BackgroundArea,xRat,yRat,lelems,welems);
[RingArea_DS,~,~] = NiuDownSample(RingArea,xRat,yRat,lelems,welems);
[B] = bwboundaries(TumorArea_DS);
Tumb_DS = B{1};
[B] = bwboundaries(BackgroundArea_DS);
Bckb_DS = B{1};
[B] = bwboundaries(RingArea_DS);
Rngb_DS = B{1};
%% Strain Refinement Algorithm
% PLSorSIN = 'SIN';
% WeightSets = [1,10,10];
% [Axial,Lateral,strainA,strainL] = STREAL(Axial_DS,Lateral_DS,dx,dy,WeightSets,PLSorSIN);
%% Examining different criteria for each set of deformation data
% Reasonable displacement 
% Calculting incompressibility and compatibility
% Note: You don't need to calculate IEMat and CEMat everytime as long as
% the number of elements are remaining the same
IEMat = IEM(lelems+1,welems+1,dx,dy);
[Inc] = CalcInc(Axial_DS,Lateral_DS,IEMat);
Inc_sq = reshape(Inc,[lelems welems])';
CEMat = CEM(lelems+1,welems+1,dx,dy);
[Cmpt] = CalcCmpt(strainA_DS,strainL_DS,CEMat);
Cmpt_sq = reshape(Cmpt,[lelems-2 welems-2])';
% Consistency between stiffness image and bmode image
%% Young's Modulus Reconstruction
% wins = {5,5};
% ALWeighting = {1,0};
% tol = 0.01;
% [E1] = YMImage(Axial,Lateral,strainA,strainL,dx,dy,wins,ALWeighting,tol,name);
% ALWeighting = {10,1};
% [E2] = YMImage(Axial,Lateral,strainA,strainL,dx,dy,wins,ALWeighting,tol,name);
% % Plotting YM images
% f = figure;
% subplot(2,2,1);imagesc([0 dx*(lelems-startA)],dy*[startRF welems],E1/max(max(E1)));colormap(((jet)));colorbar;caxis([0.001 1]);
% title('Only Axial');
% subplot(2,2,2);imagesc([0 dx*(lelems-startA)],dy*[startRF welems],E2/max(max(E2)));colormap(((jet)));colorbar;caxis([0.001 1]);
% title('Axial:Lateral -> 10:1');
% subplot(2,2,3);imagesc([0 dx*(lelems-startA)],dy*[startRF welems],E1/max(max(E1)));colormap(((jet)));colorbar;caxis([0.001 1]);
% hold on
% plot(Tumb_DS(:,2)*dx, Tumb_DS(:,1)*dy, 'w', 'LineWidth', 2)
% hold on
% plot(Bckb_DS(:,2)*dx, Bckb_DS(:,1)*dy, 'g', 'LineWidth', 2)
% hold on
% plot(Rngb_DS(:,2)*dx, Rngb_DS(:,1)*dy, 'g', 'LineWidth', 2)
% subplot(2,2,4);imagesc([0 dx*(lelems-startA)],dy*[startRF welems],E2/max(max(E2)));colormap(((jet)));colorbar;caxis([0.001 1]);
% hold on
% plot(Tumb_DS(:,2)*dx, Tumb_DS(:,1)*dy, 'w', 'LineWidth', 2)
% hold on
% plot(Bckb_DS(:,2)*dx, Bckb_DS(:,1)*dy, 'g', 'LineWidth', 2)
% hold on
% plot(Rngb_DS(:,2)*dx, Rngb_DS(:,1)*dy, 'g', 'LineWidth', 2)
% f.Position = [409,418,751,420];
% saveas(f,strcat(name,'-YM'),'png');




