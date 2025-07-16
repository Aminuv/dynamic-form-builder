export const startViewTransition = (callback: () => void) => {
    if (!document.startViewTransition) {
        console.log('View transition not supported');
        callback();
    }else{
        document.startViewTransition(callback);
    }
}
