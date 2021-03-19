function [Cmpt] = CalcCmpt(strainA,strainL,CEM)

strainS = 0.5 * (strainA + strainL);
ex = strainL';
ex = ex(:);
ey = strainA';
ey = ey(:);
exy = strainS';
exy = exy(:);
em = [ex;ey;exy];

Cmpt = CEM * em;

end

