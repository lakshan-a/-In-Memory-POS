function checkValidity(object) {
    let errorCount = 0;
    for (let validation of object) {
        if (check(validation.reg, validation.field)) {
            textSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setTextError(validation.field, validation.error);
        }
    }
    setButtonStateCS(errorCount);
    setButtonStateCU(errorCount);
    setButtonStateIS(errorCount);
    setButtonStateIU(errorCount);
}