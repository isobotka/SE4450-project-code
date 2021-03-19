function [] = PlotStrains(name,strA,strL,Bndrs,dims)
% Plots strains and displays tumour and background areas
%  Author: Niusha Kheirkhah

Tumb = Bndrs{1};
Bckb = Bndrs{2};
Rngb = Bndrs{3};
startA = 1;
startRF = 1;
endA = dims{1};
endRF = dims{2};
xRat = dims{5};
yRat = dims{6};

f = figure;
subplot(2,2,1);imagesc([0 xRat*(endA-startA)],yRat*[startRF endRF],strA);colormap(flipud(colormap(jet)));colorbar;caxis([0 max(max(strA))]);
subplot(2,2,2);imagesc([0 xRat*(endA-startA)],yRat*[startRF endRF],strL);colormap(flipud(colormap(jet)));colorbar;caxis([0 max(max(strL))]);
subplot(2,2,3);imagesc([0 xRat*(endA-startA)],yRat*[startRF endRF],strA);colormap(flipud(colormap(jet)));colorbar;caxis([0 max(max(strA))]);
hold on
plot(Tumb(:,2)*xRat, Tumb(:,1)*yRat, 'w', 'LineWidth', 2)
hold on
plot(Bckb(:,2)*xRat, Bckb(:,1)*yRat, 'g', 'LineWidth', 2)
hold on
plot(Rngb(:,2)*xRat, Rngb(:,1)*yRat, 'g', 'LineWidth', 2)
subplot(2,2,4);imagesc([0 xRat*(endA-startA)],yRat*[startRF endRF],strL);colormap(flipud(colormap(jet)));colorbar;caxis([0 max(max(strL))]);
hold on
plot(Tumb(:,2)*xRat, Tumb(:,1)*yRat, 'w', 'LineWidth', 2)
hold on
plot(Bckb(:,2)*xRat, Bckb(:,1)*yRat, 'g', 'LineWidth', 2)
hold on
plot(Rngb(:,2)*xRat, Rngb(:,1)*yRat, 'g', 'LineWidth', 2)
% xticklabels({})
% yticklabels({})
f.Position = [409,418,751,420];
saveas(f,strcat(name,'-strains'),'png');

end

