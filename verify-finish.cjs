const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),T=require('./core.js');
const source=fs.readFileSync(__dirname+'/app.js','utf8');const handler=source.slice(source.indexOf("if(act==='finish')"),source.indexOf("if(act==='newblock')"));const complete=source.match(/function completeSession\(partial\)\{[^\n]+/)[0];
const P={days:[{id:'mon',slots:[{id:'s1',options:['e1','e2']}]}],exercises:{e1:{sets:2},e2:{sets:2}}};
for(const done of [[false,false],[true,false],[true,true]]){
 const sets=done.map(done=>({done,load:done?'10':'',left:done?'8':''}));const state={complete:false,entries:{e1:{sets}},choices:{},skipped:{}};const original=JSON.stringify(sets);
 const ctx={act:'finish',session:()=>state,express:false,S:{prefs:{}},P,T,w:1,day:'mon',save:()=>true,toast:()=>{},workout:()=>{}};vm.createContext(ctx);vm.runInContext(complete+'\n(function(){'+handler+'})()',ctx);assert.equal(state.complete,true);assert.equal(state.partial,done.some(x=>!x));assert.equal(JSON.stringify(sets),original);vm.runInContext('(function(){'+handler+'})()',ctx);assert.equal(state.complete,false);assert.equal(JSON.stringify(sets),original);
 ctx.save=()=>false;vm.runInContext('(function(){'+handler+'})()',ctx);assert.equal(state.complete,false,'failed storage cannot claim completion');
}
let s={entries:{e1:{sets:[{done:true},{done:false}]}},choices:{},skipped:{s1:{id:'e1',reason:'Short on time'}}};let n=T.sessionSummary(P,s,{},1,'mon');assert.deepEqual([n.completed,n.skipped,n.remaining,n.loggedSets],[0,1,0,1]);delete s.skipped.s1;n=T.sessionSummary(P,s,{},1,'mon');assert.equal(n.remaining,1);s.choices.s1='e2';s.entries.e2={sets:[{done:true},{done:true}]};n=T.sessionSummary(P,s,{},1,'mon');assert.equal(n.completed,1);assert.equal(n.loggedSets,3);
console.log('PASS: empty, partial and full sessions finish/reopen; failed save does not claim success; skip/undo and swaps preserve actual logged work.');
