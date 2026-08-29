import { useEffect, useRef, useState } from 'react';
import useScrollReveal from './hooks/useScrollReveal';
import './App.css';
import './FlankRail.css';
import './Panoramic3D.css';
import './PanoramaRefine.css';


const projects = [
  { id:0,title:'CHOTA DHOBI',index:'#0',badge:'CHOTA DHOBI APP',badgeClass:'chota',previewImage:'/assets/chota-preview.png',tagline:'A simple booking experience that helps customers schedule laundry services quickly and track every order with confidence.',caseStudyUrl:'#projects',liveUrl:'#projects' },
  { id:1,title:'RESPOS',index:'#1',badge:'RESPOS',badgeClass:'respos',previewImage:'/assets/respos-preview.jpg',tagline:'A fast, easy-to-use restaurant system that keeps orders moving and teams productive—even when the internet does not.',caseStudyUrl:'#projects',liveUrl:'#projects' },
  { id:2,title:'INSTATICKETS',index:'#2',badge:'INSTATICKETS',badgeClass:'insta',previewImage:'/assets/instatickets-preview.png',tagline:'A seamless event discovery and booking experience designed to turn interest into ticket sales across every device.',caseStudyUrl:'#projects',liveUrl:'#projects' },
  { id:3,title:'DELIGHT CORNER',index:'#3',badge:'Delight Corner',badgeClass:'delight',previewImage:'/assets/delight-preview.png',tagline:'A warm digital storefront that makes the brand memorable, ordering effortless, and repeat visits more likely.',caseStudyUrl:'#projects',liveUrl:'#projects' },
  { id:4,title:'AAI OPERATIONS',index:'#4',badge:'AAI OPERATIONS',badgeClass:'aai',previewImage:'/assets/aai-preview.png',tagline:'A clearer way for airport teams to manage information, coordinate daily work, and make faster decisions.',caseStudyUrl:'#projects',liveUrl:'#projects' },
  { id:5,title:'SPINDLE & CO',index:'#5',badge:'Spindle & Co',badgeClass:'spindle',previewImage:'/assets/spindle-preview.png',tagline:'A distinctive luxury brand experience built to capture attention, communicate quality, and inspire trust.',caseStudyUrl:'#projects',liveUrl:'#projects' },
  { id:6,title:'KUBERNS',index:'#6',badge:'Kuberns',badgeClass:'kuberns',previewImage:'/assets/kuberns-preview.jpg',tagline:'A streamlined platform that makes managing online services simpler, faster, and easier to scale.',caseStudyUrl:'#projects',liveUrl:'#projects' },
];

const galleryItems=[
  {type:'image',src:'/assets/greek-statue.png',alt:'Greek marble bust with floating interface panels',className:'gallery-cutout gallery-statue'},
  {type:'image',src:'/assets/monalisa-gold-frame.png',alt:'Mona Lisa in an ornate gold frame',className:'gallery-cutout gallery-portrait'},
  {type:'image',src:'/assets/venus-statue.png',alt:'Draped Hellenistic marble muse',className:'gallery-cutout gallery-venus'},
  {type:'image',src:'/assets/vintage-oil-painting.png',alt:'Framed Renaissance landscape',className:'gallery-cutout gallery-landscape'},
  {type:'image',src:'/assets/calligraphy-swash.png',alt:'Flourished calligraphic monogram',className:'gallery-cutout gallery-swash'},
  {type:'image',src:'/assets/baroque-frame.png',alt:'Dutch Master portrait in a baroque frame',className:'gallery-cutout gallery-baroque'},
  {type:'image',src:'/assets/statue-modern.png',alt:'Surreal marble bust with modern interface fragments',className:'gallery-cutout gallery-modern'},
  {type:'image',src:'/assets/emerald-card.png',alt:'Emerald acrylic specimen card',className:'gallery-cutout gallery-emerald'},
  {type:'poster',content:'GET NOTICED · BUILD TRUST · ATTRACT CUSTOMERS',className:'gallery-poster'},
  {type:'poster',content:'TURNING ATTENTION INTO REVENUE',className:'gallery-poster light'},
  {type:'image',src:'/assets/winged-statue.png',alt:'Winged Victory marble statue',className:'gallery-cutout gallery-winged'},
  {type:'image',src:'/assets/botanical-glass.png',alt:'Pressed gold botanical specimen on glass',className:'gallery-cutout gallery-botanical'},
];

function Panoramic3DSection(){
  const [rotation,setRotation]=useState(0),[cameraZ,setCameraZ]=useState(-950);
  const containerRef=useRef(null),dragging=useRef(false),hoveredCard=useRef(false),lastX=useRef(0),velocity=useRef(0),rotationRef=useRef(0),frame=useRef();
  useEffect(()=>{rotationRef.current=rotation},[rotation]);
  useEffect(()=>{const element=containerRef.current;if(!element)return;const onWheel=(event)=>{event.preventDefault();event.stopPropagation();setCameraZ(value=>Math.min(200,Math.max(-2200,value-event.deltaY*1.2)))};element.addEventListener('wheel',onWheel,{passive:false});return()=>element.removeEventListener('wheel',onWheel)},[]);
  useEffect(()=>{const tick=()=>{if(!dragging.current){velocity.current*=.92;const autoSpeed=hoveredCard.current?-.08:-.2;rotationRef.current+=velocity.current+autoSpeed;setRotation(rotationRef.current)}frame.current=requestAnimationFrame(tick)};frame.current=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame.current)},[]);
  const pointerDown=(e)=>{dragging.current=true;lastX.current=e.clientX;velocity.current=0;e.currentTarget.setPointerCapture(e.pointerId)};
  const pointerMove=(e)=>{if(!dragging.current)return;const delta=e.clientX-lastX.current;lastX.current=e.clientX;velocity.current=delta*.34;rotationRef.current+=velocity.current;setRotation(rotationRef.current)};
  const pointerUp=()=>{dragging.current=false};
  return <section className="panorama-section"><h2>GET NOTICED · BUILD TRUST · ATTRACT CUSTOMERS · SCALE YOUR BUSINESS</h2><div ref={containerRef} className="panorama-frame" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onPointerLeave={pointerUp}>
    <span className="hint top-left">Drag to explore</span><span className="hint top-right">Scroll to look closer</span><span className="hint bottom-left">Explore the full 360° view</span><span className="hint bottom-right">Keep scrolling to discover more</span>
    <div className="gallery-ring" style={{transform:`translateZ(${cameraZ}px) rotateY(${rotation}deg)`}}>{galleryItems.map((item,index)=><div className="gallery-position" style={{transform:`rotateY(${index*(360/galleryItems.length)}deg) translateZ(1300px)`}} key={`${item.type}-${index}`}><article className={`gallery-art ${item.className}`} onPointerEnter={()=>{hoveredCard.current=true}} onPointerLeave={()=>{hoveredCard.current=false}}>{item.type==='image'?<img src={item.src} alt={item.alt} draggable="false"/>:<><p>{item.content}</p><small>YOUR COMPLETE DIGITAL GROWTH PARTNER</small></>}</article></div>)}</div>
  </div><p className="panorama-subtitle">MODERN WEBSITES · IMPACTFUL VIDEO · TARGETED ADS · AI AUTOMATION</p></section>;
}

export default function App(){
  useScrollReveal();
  const [current,setCurrent]=useState(2),[direction,setDirection]=useState(1),[ingesting,setIngesting]=useState(null),[muted,setMuted]=useState(false),[pressed,setPressed]=useState(''),[copied,setCopied]=useState(false),[time,setTime]=useState('');
  const project=projects[current];
  const move=(step)=>{const next=(current+step+projects.length)%projects.length;setDirection(step);setIngesting({item:projects[next],step,token:Date.now()});setCurrent(next)};
  const open=(key)=>window.open(project[key],'_blank','noopener,noreferrer');

  useEffect(()=>{const tick=()=>setTime(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date()));tick();const timer=setInterval(tick,1000);return()=>clearInterval(timer)},[]);
  useEffect(()=>{const down=(e)=>{if(['ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();setPressed(e.code);if(e.repeat)return;const navigate=(step)=>{const next=(current+step+projects.length)%projects.length;setDirection(step);setIngesting({item:projects[next],step,token:Date.now()});setCurrent(next)};if(e.code==='ArrowLeft')navigate(-1);if(e.code==='ArrowRight')navigate(1);if(e.code==='KeyC')window.open(project.caseStudyUrl,'_blank','noopener,noreferrer');if(e.code==='KeyV')window.open(project.liveUrl,'_blank','noopener,noreferrer');if(e.code==='KeyM')setMuted(x=>!x)};const up=()=>setPressed('');window.addEventListener('keydown',down);window.addEventListener('keyup',up);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up)}},[project,current]);
  useEffect(()=>{if(!ingesting)return;const timer=setTimeout(()=>setIngesting(null),440);return()=>clearTimeout(timer)},[ingesting]);
  const copyEmail=async()=>{await navigator.clipboard?.writeText('hello@kaznext.com');setCopied(true);setTimeout(()=>setCopied(false),1600)};

  return <div className="page-shell">
    <header className="nav-wrap"><a className="brand" href="#home"><img className="brand-avatar" src="/assets/KAZ.jpeg" alt="KAZ NEXT"/><span className="brand-copy">KAZ NEXT<small>● ACCEPTING NEW GROWTH PROJECTS</small></span></a><nav className="nav-links"><a href="#home">Home</a><a href="#home">About</a><a href="#projects">Work</a><a href="#contact">Contact</a><a href="#contact">Partner</a></nav><a className="nav-book" href="mailto:hello@kaznext.com">Request Availability</a></header>
    <main id="home">
      <section className="hero shell reveal-on-scroll"><p className="hero-intro">● Accepting New Growth Projects</p><h1><span>We build digital experiences</span><span><em>that help businesses get noticed,</em> build trust, and grow.</span></h1><p className="hero-subtitle">Get noticed. Build trust. Turn visitors into customers.</p><p className="hero-bio">From high-converting websites and visual content to targeted advertising and AI automation—we turn online attention into real customers and measurable business growth.</p><div className="hero-actions"><a className="hero-primary" href="#contact">Start Your Project</a><a className="hero-secondary" href="#projects">↓ Explore Our Work</a></div></section>
      <section id="projects" className="showcase shell reveal-on-scroll"><p className="fun-title">Selected Work · Discover how we help brands stand out and drive real results.</p><div className={`flank-rail-layer direction-${direction>0?'next':'prev'}`} aria-hidden="true"><div className="side-rail left-rail" key={`left-${current}`}>{[2,1].map(offset=>{const item=projects[(current-offset+projects.length)%projects.length];return <div className={`rail-card ${item.badgeClass}`} key={item.id}>{item.badge}</div>})}</div><div className="rail-safety-gap"/><div className="side-rail right-rail" key={`right-${current}`}>{[1,2].map(offset=>{const item=projects[(current+offset)%projects.length];return <div className={`rail-card ${item.badgeClass}`} key={item.id}>{item.badge}</div>})}</div>{ingesting&&<div key={ingesting.token} className={`ingesting-card from-${ingesting.step>0?'right':'left'} rail-card ${ingesting.item.badgeClass}`}>{ingesting.item.badge}</div>}</div>
        <div className="game-layout"><aside className="game-flank left-flank"><div className="instructions"><p>use arrow keys to move, <kbd>m</kbd> to Mute</p><div className="instruction-card"><span>MOVE LEFT</span><div className="outline-dpad"><i/><i/></div><span>MOVE RIGHT</span></div></div></aside>
          <div className="game-center"><div className="gameboy"><div className="screen-enclosure"><div className={`project-reel slide-${direction>0?'next':'prev'}`}><img key={project.title} src={project.previewImage} alt={`${project.title} interface preview`}/></div><div className="device-meta"><b>GAMEBOY</b><span><i/>▥▥▥ v.05.13.03</span></div><div className="terminal" key={`${project.title}-terminal`}><div><strong>{project.title}</strong><span>{project.index}</span></div><p>{project.tagline}</p></div></div><div className="console-controls"><div className={`dpad-control ${pressed==='ArrowLeft'?'press-left':''} ${pressed==='ArrowRight'?'press-right':''} ${pressed==='ArrowUp'?'press-up':''} ${pressed==='ArrowDown'?'press-down':''}`}><i/><i/><span className="dpad-center"/><button className={`dpad-hit left ${pressed==='ArrowLeft'?'is-pressed':''}`} onClick={()=>move(-1)}>◀</button><button className={`dpad-hit right ${pressed==='ArrowRight'?'is-pressed':''}`} onClick={()=>move(1)}>▶</button><button className="dpad-hit up">▲</button><button className="dpad-hit down">▼</button></div><div className="action-controls"><button className={`action-key ${pressed==='KeyC'?'is-pressed':''}`} onClick={()=>open('caseStudyUrl')}>C</button><button className={`action-key ${pressed==='KeyV'?'is-pressed':''}`} onClick={()=>open('liveUrl')}>V</button></div></div><div className="console-bottom"><span>C-CASE STUDY • V-VIEW LIVE</span><button className={`${muted?'is-muted':''} ${pressed==='KeyM'?'is-pressed':''}`} onClick={()=>setMuted(x=>!x)} aria-label="Toggle sound"/></div></div></div>
          <aside className="game-flank right-flank"><div className="instructions"><p>use <kbd>c</kbd> &amp; <kbd>v</kbd> to open external links</p><div className="instruction-card action-instruction"><span>OPEN CASE<br/>STUDY</span><div className="outline-actions"><i/><i/></div><span>VIEW LIVE<br/>PRODUCT</span></div></div></aside></div>
      </section>
      <Panoramic3DSection/>
    </main>
    <footer id="contact"><div className="footer-top shell"><div className="status dark"><i/> AVAILABLE FOR NEW BUSINESS PARTNERSHIPS</div><div className="coordinates">YOUR BUSINESS<br/><span>OUR DIGITAL EXPERTISE</span></div></div><div className="footer-main shell"><div><p>LET'S BUILD A DIGITAL PRESENCE THAT ACTUALLY DRIVES GROWTH.</p><h2>Ready to take your business<br/><em>to the next level?</em></h2></div><div className="footer-links"><div><small>EXPLORE</small><a href="#home">Home</a><a href="#projects">Selected Work</a><a href="#home">Our Approach</a><a href="#contact">Contact</a></div><div><small>START A CONVERSATION</small><button onClick={copyEmail}>{copied?'Email copied!':'Partner With KAZ NEXT'} <span>□</span></button><a href="#contact">Websites &amp; Content ↗</a><a href="#contact">Advertising &amp; Growth ↗</a><a href="#contact">AI &amp; Automation ↗</a></div></div></div><div className="footer-bottom shell"><span>© 2026 KAZ NEXT. ALL RIGHTS RESERVED.</span><span>LOCAL TIME / {time}</span><span>YOUR COMPLETE DIGITAL GROWTH PARTNER</span></div></footer>
  </div>;
}
