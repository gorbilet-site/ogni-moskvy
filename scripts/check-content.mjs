import { build } from 'esbuild';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
fs.mkdirSync('.work', { recursive: true });
await build({stdin:{contents:'export { offers } from "./src/data/offers"; export { withUtm } from "./src/lib/site";',resolveDir:process.cwd()},bundle:true,platform:'node',format:'cjs',outfile:'.work/content.cjs',tsconfig:'tsconfig.json',logLevel:'silent'});
const {offers,withUtm}=createRequire(import.meta.url)(resolve('.work/content.cjs'));
const rows=[];
const expected={
  'novogodnyaya-moskva':'avtexcursion_msk',
  'hram-hrista-spasitelya-smotrovye':'avtexcursion_msk',
  'novogodnyaya-skazka-v-gorode':'avtexcursion_msk',
  'salon-krasoty':'spektakl_msk',
  'vitalya':'spektakl_msk',
  'shou-pod-dozhdem':'spektakl_msk',
  'poslednij-stendap-millionera':'spektakl_msk',
};
for(const offer of offers){
 const u=new URL(withUtm(offer.url,offer.campaign));
 assert.equal(u.searchParams.get('utm_source'),'vk');
 assert.equal(u.searchParams.get('utm_medium'),'rassilka_tr');
 assert.equal(u.searchParams.get('utm_campaign'),expected[offer.slug]||'moscow_newyear_mesta_msk');
 assert.equal(u.searchParams.get('utm_content'),new URL(offer.url).pathname.split('/').filter(Boolean).at(-1));
 assert.equal(u.searchParams.has('utm_term'),false);
 assert.ok(fs.statSync('public'+offer.photo).size>1000);
 rows.push({title:offer.title,url:u.toString()});
}
const q=new URL(withUtm('https://gorbilet.ru/msk/actions/example/?date=2026-12-31&utm_term=old&utm_campaign=old#tickets','mesta_msk'));
assert.equal(q.searchParams.get('date'),'2026-12-31');
assert.equal(q.hash,'#tickets');
assert.equal(q.searchParams.has('utm_term'),false);
assert.equal(withUtm(q.toString(),'mesta_msk'),q.toString());
assert.equal(offers.length,15);
fs.mkdirSync('project-notes',{recursive:true});
fs.writeFileSync('project-notes/tagged-links.json',JSON.stringify(rows,null,2)+'\n');
console.log('Verified: 15 offer photos and category-specific links; content is the full destination slug; no utm_term; existing query/hash preserved.');
