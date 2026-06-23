(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`http://localhost:3044/users`,t=`http://localhost:3044/tasks`,n=null,r=0,i=()=>n,a=e=>{n=e},ee=()=>r,o=()=>{r++},s=()=>{r=0},c=null,l=()=>c,u=e=>{c=e},te=document.getElementById(`user-doc`),d=document.getElementById(`btn-search`),f=document.getElementById(`search-error`),p=document.getElementById(`user-info-display`),m=document.getElementById(`task-form`),h=document.getElementById(`task-title`),g=document.getElementById(`title-error`),_=document.getElementById(`task-desc`),v=document.getElementById(`desc-error`),y=document.getElementById(`task-status`),b=document.getElementById(`status-error`),x=document.getElementById(`tasks-table`),S=document.getElementById(`task-count`),C=document.getElementById(`filter-title`),w=document.getElementById(`filter-status`),ne=document.getElementById(`btn-export`),re=async(e,t,n={})=>{if(e.ok)return await e.json();let r=n[e.status]||t,i=Error(`${r} (Código: ${e.status})`);throw i.status=e.status,i},T=async(e,t={},n={},r=`Error en la petición`)=>{let i;try{i=await fetch(e,t)}catch{throw Error(`Servicio no disponible`)}return re(i,r,n)},ie=async t=>T(`${e}/${t}`,{},{400:`Petición incorrecta`,401:`No autorizado`,403:`Acceso denegado`,404:`Recurso no encontrado`,500:`Error interno del servidor`},`Error al buscar usuario`),ae=async e=>(await T(`http://localhost:3044/users/${e}?_embed=tasks`,{},{500:`Error interno del servidor al obtener tareas`},`Error al obtener las tareas`)).tasks||[],oe=async e=>{let t=await ie(e);return{user:t,tasks:await ae(t.id)}},se=async e=>T(t,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)},{400:`Datos de tarea inválidos`,500:`Error interno del servidor`},`Error al registrar la tarea`),E=async(e,n)=>T(`${t}/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)},{404:`Tarea no encontrada`,500:`Error interno del servidor`},`Error al actualizar la tarea`),D=async e=>T(`${t}/${e}`,{method:`DELETE`},{404:`Tarea no encontrada`,500:`Error interno del servidor`},`Error al eliminar la tarea`),O=async e=>await se(e),k=async(e,t)=>await E(e,t),A=async e=>await D(e),j=e=>{let t=w.value,n=C.value.toLowerCase().trim();return e.filter(e=>{let r=t===`todos`||e.status===t,i=e.title.toLowerCase().includes(n);return r&&i})},M=e=>[...e].sort((e,t)=>new Date(e.date)-new Date(t.date)),N=e=>[...e].sort((e,t)=>e.title.localeCompare(t.title)),P=(e,t)=>[...e].sort((e,n)=>e.status===t&&n.status!==t?-1:+(e.status!==t&&n.status===t)),F=(e,t)=>!t||t===`date`?M(e):t===`name`?N(e):t===`pendiente`||t===`en-progreso`||t===`completada`?P(e,t):e,I=()=>{let e=document.querySelectorAll(`#tasks-table > .message-card`);return Array.from(e).map(e=>({id:e.id,title:e.querySelector(`.message-card__title`).textContent,description:e.querySelector(`.message-card__content`).textContent,status:e.querySelector(`.task-badge`).className.match(/task-badge--(\S+)/)[1],date:e.dataset.date||``,element:e}))},L=`
<div class="card__order-bar">
                    <label for="status-order" class="form__label"
                        >Ordenar Tareas:</label
                    >
                    <select
                        id="status-order"
                        class="form__input form__input--filter"
                    >
                        <option value="">Seleccione orden</option>
                        <option value="date">Fecha de creación</option>
                        <option value="name">Nombre de la tarea</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en-progreso">En Progreso</option>
                        <option value="completada">Completada</option>
                    </select>
                </div>
`,R=async()=>{let e=document.querySelector(`.card__order-bar`);e&&e.remove(),x.insertAdjacentHTML(`beforebegin`,L)},z=e=>{m.querySelectorAll(`input, textarea, select, button`).forEach(t=>{t.disabled=e})},B=()=>{x.innerHTML=``,s(),S.textContent=`0 Tareas`},V=e=>{p.innerHTML=`
    
        <div class="message-card__header">
        
            <div class="message-card__user">
            
                <div class="message-card__avatar">
                    ${e.name.charAt(0)}
                </div>

                <div>
                    <div class="message-card__username">
                        ${e.name}
                    </div>

                    <div class="message-card__title">
                        Usuario encontrado
                    </div>
                </div>

            </div>

        </div>

        <div class="message-card__content">

            <strong>Documento:</strong> ${e.id}<br>
            <strong>Nombre:</strong> ${e.name}<br>
            <strong>Email:</strong> ${e.email}

        </div>
    `},H=e=>e!=null&&e.trim()!==``,U={SUCCESS:`success`,ERROR:`error`,INFO:`info`},W={[U.SUCCESS]:`✅`,[U.ERROR]:`❌`,[U.INFO]:`ℹ️`},G=e=>(e||(e=document.getElementById(`notifications-container`),e||(e=document.createElement(`div`),e.id=`notifications-container`,document.body.appendChild(e))),e),K=(e,t=U.INFO,n=1e3)=>{let r=document.createElement(`div`);return r.className=`notification notification--${t}`,r.setAttribute(`role`,`alert`),r.innerHTML=`
        <span class="notification__icon">${W[t]}</span>
        <span class="notification__message">${e}</span>
    `,G().appendChild(r),setTimeout(()=>ce(r),n),r},ce=e=>{!e||e.classList.contains(`notification--dismissing`)||(e.classList.add(`notification--dismissing`),e.addEventListener(`animationend`,()=>e.remove(),{once:!0}))},q=e=>K(e,U.SUCCESS),J=e=>K(e,U.ERROR),le=e=>K(e,U.INFO),ue={pendiente:`Pendiente`,"en-progreso":`En Progreso`,completada:`Completada`},de=e=>ue[e]||`Sin estado`,fe=(e,t=`tareas.json`)=>{let n=JSON.stringify(e,null,2),r=new Blob([n],{type:`application/json`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=t,a.click(),URL.revokeObjectURL(i)},pe=e=>{let t=document.querySelector(`.messages-empty`);t&&t.remove();let n=document.createElement(`div`);n.classList.add(`message-card`),e.id&&(n.id=`${e.id}`),e.date&&(n.dataset.date=e.date);let r=de(e.status),a=i();n.innerHTML=`
    
        <div class="message-card__header">

            <div class="message-card__user">
                <div class="message-card__avatar">
                    ${a.name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <div class="message-card__username">
                        ${a.name}
                    </div>
                    
                    <div class="message-card__title">
                        ${e.title}
                    </div>
                </div>
            </div>

            <span class="task-badge task-badge--${e.status}">
                ${r}
            </span>

        </div>
        
        <div class="message-card__body">
            <div class="message-card__content">
                ${e.description||`Sin descripción`}
            </div>
            <button type="button" class="btn btn--secondary btnUpdate" data-id="${e.id}">
                Actualizar
            </button>
            <button type="button" class="btn btn--secondary btnDelete" data-id="${e.id}">
                Eliminar
            </button>
        </div>
    `,x.prepend(n),o(),S.textContent=`${ee()} Tareas`},me=()=>{let e=document.querySelector(`.card__order-bar`);e&&e.remove()},Y=()=>{me(),x.innerHTML=`
        <div class="messages-empty">
            <div class="messages-empty__icon">📋</div>
            <p class="messages-empty__text">El usuario no tiene tareas</p>
            <p class="messages-empty__subtext">Registre una nueva tarea.</p>
        </div>
    `},he=(e,t)=>{e.innerHTML=t},X=(e,t)=>{if(t===void 0)return e.textContent;e.textContent=t},Z=`task-badge--`,ge=e=>{let t=e.className.split(` `);for(let e of t)if(e.startsWith(Z))return e.slice(12);return`sin-estado`},_e=()=>{let e=x.querySelectorAll(`.message-card`);return e.length?Array.from(e).map(e=>{let t=e.querySelector(`.message-card__title`)?.textContent.trim()||``,n=e.querySelector(`.message-card__content`)?.textContent.trim()||``,r=e.querySelector(`.task-badge`),i=r?ge(r):`sin-estado`;return{id:e.id,title:t,description:n,status:i}}):[]},ve=()=>{let e=_e();if(!e.length){le(`No hay tareas visibles para exportar`);return}fe(e,`tareas.json`)},Q=e=>{if(B(),!e.length){Y();return}let t=j(e);if(!t.length){Y();return}R(),t.forEach(pe)};z(!0);var $=[];d.addEventListener(`click`,async()=>{let e=te.value.trim();if(X(f,``),!H(e)){X(f,`Debe ingresar un documento`),J(`Debe ingresar un documento`);return}try{B();let{user:t,tasks:n}=await oe(e);a(t),V(t),z(!1),q(`Usuario encontrado correctamente`),$=n,$.length>0?Q($):(B(),Y())}catch(e){z(!0),he(p,`
            <div class="message-card__content">❌ ${e.message}</div>
        `),J(e.message),B(),Y(),console.error(e)}}),m.addEventListener(`submit`,async e=>{e.preventDefault();let t=h.value.trim(),n=_.value.trim(),r=y.value,a=l();if(X(g,``),X(v,``),X(b,``),!H(t)){X(g,`Debe ingresar un título`),J(`Debe ingresar un título`);return}if(!H(n)){X(v,`Debe ingresar una descripción`),J(`Debe ingresar una descripción`);return}if(!H(r)){X(b,`Debe seleccionar un estado`),J(`Debe seleccionar un estado`);return}try{if(a){let e=await k(a,{title:t,description:n,status:r}),i=$.findIndex(t=>t.id==e.id);i!==-1&&($[i]=e),Q($),u(null),m.reset(),X(m.querySelector(`button[type="submit"]`),`Guardar Tarea`),q(`Tarea actualizada correctamente`)}else{let e=await O({userId:i().id,title:t,description:n,status:r});$.push(e),Q($),m.reset(),q(`Tarea registrada correctamente`)}}catch(e){J(e.message)}}),x.addEventListener(`click`,e=>{let t=e.target.closest(`.btnUpdate`);if(!t)return;e.preventDefault();let n=t.getAttribute(`data-id`),r=t.closest(`.message-card`);if(!r)return;let i=X(r.querySelector(`.message-card__title`)).replace(`Tarea: `,``).trim(),a=X(r.querySelector(`.message-card__content`)).trim();h.value=i,_.value=a,y.value=``,u(n),X(m.querySelector(`button[type="submit"]`),`Actualizar Tarea`),m.scrollIntoView({behavior:`smooth`,block:`center`}),h.focus()}),x.addEventListener(`click`,async e=>{let t=e.target.closest(`.btnDelete`);if(!t)return;e.preventDefault();let n=t.getAttribute(`data-id`);try{await A(n),$=$.filter(e=>e.id!=n),Q($),q(`Tarea eliminada correctamente`)}catch(e){J(e.message)}}),C.addEventListener(`input`,()=>Q($)),w.addEventListener(`change`,()=>Q($)),document.addEventListener(`change`,e=>{let t=e.target.closest(`#status-order`);if(!t)return;let n=t.value||`date`,r=I();r.length&&F(r,n).forEach(e=>{x.appendChild(e.element)})}),ne.addEventListener(`click`,ve);