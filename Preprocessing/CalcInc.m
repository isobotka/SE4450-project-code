function [Inc] = CalcInc(Axial,Lateral,IEMat)

ux = Lateral';
ux = ux(:);
uy = Axial';
uy = uy(:);
um = [ux;uy];  

Inc = IEMat * um;

end

