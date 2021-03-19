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

