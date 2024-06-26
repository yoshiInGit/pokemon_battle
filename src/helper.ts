import anime from "animejs";

export const hide = ({id} : {id : string}) => {
    const el : any = document.querySelector(`#${id}`)!;
    el.style.display = "none"
}

export const show = ({id, opt} : {id : string, opt? : string}) =>{
    const el : any = document.querySelector(`#${id}`)!;
    el.style.display = opt ?? "block"
}

export const fadeout = async ({targets, time_ms, easing="linear"} : {targets: string, time_ms : number, easing? : string}) => {
    anime({
        targets: targets,
        opacity : 0,
        duration: time_ms,
        easing: easing
    })

    await sleep_ms(time_ms);
}

export const fadein = async ({targets, time_ms} : {targets: string, time_ms : number}) => {
    anime({
        targets: targets,
        opacity : 1,
        duration: time_ms,
        easing: 'linear'
    })

    await sleep_ms(time_ms);
}

export const blink = async ({id, duration} : {id : string, duration : number}) =>{
    const el : any = document.querySelector(`#${id}`)!;
    
    el.classList.add("blinking");

    await sleep_ms(duration);

    el.classList.remove("blinking");

}

export const sleep_ms = (ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};