const http=require('http'),fs=require('fs'),path=require('path'),url=require('url');
const DIR=__dirname;
http.createServer((req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS'){res.writeHead(204);return res.end();}
  const u=url.parse(req.url,true);
  if(req.method==='POST'&&u.pathname==='/save'){
    const name=path.basename(u.query.name||'out.txt');const chunks=[];
    req.on('data',c=>chunks.push(c));
    req.on('end',()=>{const b=Buffer.concat(chunks);fs.writeFileSync(path.join(DIR,name),b);res.setHeader('Content-Type','application/json');res.end(JSON.stringify({ok:true,name,bytes:b.length}));});
    return;
  }
  if(req.method==='GET'){
    const f=path.join(DIR,path.basename(u.pathname));
    if(fs.existsSync(f)&&fs.statSync(f).isFile()){res.setHeader('Content-Type','application/octet-stream');return fs.createReadStream(f).pipe(res);}
    res.writeHead(404);return res.end('nf');
  }
  res.writeHead(405);res.end();
}).listen(8127,'127.0.0.1',()=>console.log('srv2 on 8126'));
