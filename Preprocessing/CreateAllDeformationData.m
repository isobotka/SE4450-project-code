function [success] = CreateAllDeformationData(name,n_interval,n_frames,coeffs,Bndrs,dims)
% Calculates and saves deformation from all possible* pairs of frames using
% GLUE
% n_frames: number of all the frames
% n_interval: minimum interval between frames of a pair
% coeffs: GLUE coefficients
%  Author: Niusha Kheirkhah

success = 0;
mkdir Displacements
mkdir Strains
mkdir StrainsAllInOne

for ii = 1 : (n_frames - n_interval)
    for jj = (ii + n_interval) : n_frames
        name2 = strcat(name,'_',int2str(ii),',',int2str(jj));
        load(strcat('RF frames\I',int2str(ii),'.mat'))
        Im1 = I;
        load(strcat('RF frames\I',int2str(jj),'.mat'))
        Im2 = I;
        [Axial,Lateral,strainA,strainL] = Def_GLUE(Im1,Im2,coeffs,{0,0});
        % Display & Save
        f=figure; imagesc(Axial), colorbar, title('Axial Displacement'), colormap(hot);
        st = strcat('Displacements\DAx_',name2);
        save(st,'Axial');
        saveas(f,st,'png');
        f=figure; imagesc(Lateral), colorbar, title('Lateral Displacement'), colormap(hot);
        st = strcat('Displacements\DLat_',name2);
        save(st,'Lateral');
        saveas(f,st,'png');
        f=figure; imagesc(abs(strainA)), colorbar, title('Axial Strain'), colormap(flipud(colormap(jet)));caxis([0 max(max(strainA))]);
        st = strcat('Strains\SAx_',name2);
        save(st,'strainA');
        saveas(f,st,'png');
        f=figure; imagesc((strainL)), colorbar, title('Lateral Strain'), colormap(flipud(colormap(jet)));caxis([0 max(max(strainL))]);
        st = strcat('Strains\SLat_',name2);
        save(st,'strainL');
        saveas(f,st,'png');
        st = strcat('StrainsAllInOne\',name2);
        PlotStrains(st,strainA,strainL,Bndrs,dims);
        close all
        disp(st)
    end
end

success = 1;
end

