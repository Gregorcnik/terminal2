let sobeVIgri = [];
sobeVIgri.push(new Soba("Celica"));
sobeVIgri.push(new Soba("konec"));

let vrataVIgri = [];
vrataVIgri.push(new Vrata("oranzna vrata"));
vrataVIgri.push(new Vrata("zelena vrata"));

vrataVIgri[0].soba = sobeVIgri[0];
vrataVIgri[0].par = vrataVIgri[1];

vrataVIgri[1].soba = sobeVIgri[1];
vrataVIgri[1].par = vrataVIgri[0];

const jaz = new Oseba("jaz", sobeVIgri[0]);

let osebeVIgri = [];
osebeVIgri.push(jaz);

for (let i = 0; i < vrataVIgri.length; i++) {
  vrataVIgri[i].soba.vrata.push(vrataVIgri[i]);
}

for (let i = 0; i < osebeVIgri.length; i++) {
  osebeVIgri[i].lokacija.osebe.push(osebeVIgri[i]);
}