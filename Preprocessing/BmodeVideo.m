function [rf1,dims] = BmodeVideo(RfData,videoName,L,D)
% Creats B-mode images and video and saves them for a specific RF data
% It throws out the all the RF frames and also saves them in 'RF Frames'
% directory.
%  Author: Niusha Kheirkhah (nkheirkh@uwo.ca)

mkdir 'RF Frames'
mkdir 'Bmode Images'
% [rf1,hrf1] = RPread_noTag(RfData);
% save((strcat(videoName,'.mat')),'rf1');
rf1 = RfData;
I = rf1(:,:,1);
endA = size(I,2);
endRF = size(I,1);
startA = 1;
startRF = 1;
xRat = L / (endA-1);
yRat = D / (endRF-1);
endA = endA - 30;
endRF = endRF - 80;
L = endA * xRat;
D = endRF * yRat;
dims = {endA,endRF,L,D,xRat,yRat};

for i = 1:size(rf1,3)
    I = rf1(:,:,i);
    tmp = I(1:2*i,:);
    I(1:2*i,:) = [];
    I = [I;tmp];
    maxIm = max(I(:));
    I = I/maxIm;
    name = strcat('RF Frames/I',int2str(i));
    save((name),'I')
    BMODE1 = log(abs(hilbert(I))+.01);
    I = figure; imagesc([0 xRat*(endA-startA)],yRat*[startRF endRF],BMODE1(41:end-40, 16:end-15));colormap(gray), colorbar
    set(I, 'Position', [100 100 L*10 D*10])
    title(strcat('Frame #',int2str(i)));
    name = strcat('Bmode Images/I',int2str(i));
    saveas(I,name,'jpg');
    close all
end


outputVideo = VideoWriter(videoName);
outputVideo.FrameRate = 5;
open(outputVideo)
[numRow,numColumn,numHeight]=size(rf1);

for i = 1:numHeight
   img = imread(strcat('Bmode images/I',int2str(i),'.jpg'));
   writeVideo(outputVideo,img)
end

close(outputVideo);
end

