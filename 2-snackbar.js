import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as o}from"./assets/vendor-A92OCY9B.js";document.querySelector("body").style.backgroundColor="white";const m={form:document.querySelector(".form"),inputDelay:document.querySelector("#delay"),inputState:document.querySelector("#state")};function n(t){t.preventDefault();const e=t.currentTarget.elements.delay.value,r=t.currentTarget.elements.state.value;new Promise((s,i)=>{setTimeout(()=>{r==="fulfilled"?s(e):i(e)},e)}).then(()=>{o.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight",timeout:e})}).catch(()=>{o.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight",timeout:e})}),t.target.reset()}m.form.addEventListener("submit",n);
//# sourceMappingURL=2-snackbar.js.map
