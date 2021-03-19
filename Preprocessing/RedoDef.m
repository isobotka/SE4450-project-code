function [Axial,Lateral,strainA,strainL] = RedoDef(name,ii,jj,maxAL,coeffs,Bndrs,dims)
% Redo generating deformation data with assigned maximum valuse of strains
%  Author: Niusha Kheirkhah

%         success = 0;
        
        name = strcat(name,'_',int2str(ii),',',int2str(jj));
        load(strcat('RF frames\I',int2str(ii),'.mat'))
        Im1 = I;
        load(strcat('RF frames\I',int2str(jj),'.mat'))
        Im2 = I;
        [Axial,Lateral,strainA,strainL] = Def_GLUE(Im1,Im2,coeffs,maxAL);
        % Display & Save
        f=figure; imagesc(Axial), colorbar, title('Axial Displacement'), colormap(hot);
        st = strcat('Displacements\DAx_',name);
        save(st,'Axial');
        saveas(f,st,'png');
        f=figure; imagesc(Lateral), colorbar, title('Lateral Displacement'), colormap(hot);
        st = strcat('Displacements\DLat_',name);
        save(st,'Lateral');
        saveas(f,st,'png');
        f=figure; imagesc(abs(strainA)), colorbar, title('Axial Strain'), colormap(flipud(colormap(jet)));caxis([0 max(max(strainA))]);
        st = strcat('Strains\SAx_',name);
        save(st,'strainA');
        saveas(f,st,'png');
        f=figure; imagesc((strainL)), colorbar, title('Lateral Strain'), colormap(flipud(colormap(jet)));caxis([0 max(max(strainL))]);
        st = strcat('Strains\SLat_',name);
        save(st,'strainL');
        saveas(f,st,'png');
        st = strcat('StrainsAllInOne\',name);
        PlotStrains(st,strainA,strainL,Bndrs,dims);
        close all
        disp(st)

%         success = 1;
end

