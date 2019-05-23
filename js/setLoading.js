const setLoading = () => {
    document.getElementById('loader-wrapper').className = "loading";
}

const loaded =  () => {
    document.getElementById('loader-wrapper').className = "";
}

export {
    setLoading,
    loaded
};