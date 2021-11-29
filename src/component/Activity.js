import { useState } from "react";


const Activity = () => {
    let [state, setState] = useState({
        data:
            [
                {
                    id: 1,
                    activity: 'Mabar'
                },
                {
                    id: 2,
                    activity: 'Ngoding'
                }
            ],
        activityVal: '',
        id: ''
    });

    //Ketika tombol activityDelete di klik
    const activityDeleteClickHandle = (id) => {
        const filter = state.data.filter(d => d.id !== id);
        setState({ ...state, data: filter, activityVal: '', id: '' });
    }

    //Ketika form di submit
    const submitHandle = (e) => {
        e.preventDefault();
        if (!state.activityVal) { return; }
        if (state.id) {
            const newObj = {
                id: state.id,
                activity: state.activityVal
            };
            const findIndex = state.data.findIndex(d => d.id === state.id);
            const newData = [...state.data];
            newData[findIndex] = newObj
            setState({ data: newData, activityVal: '', id: '' });


            return;
        }
        const activity = {
            id: Date.now(),
            activity: state.activityVal,
        }

        setState({ ...state, data: [...state.data, activity], activityVal: '' });
    }

    //Ketika activiti diketik
    const onChangeHandle = (e) => {
        const activity = e.target.value;
        setState({ ...state, activityVal: activity });
    }

    //Ketika spasi di tekan tanpa ada karakter lain
    const keyDownHandle = (e) => {
        if (e.keyCode === 32) {
            if (state.activityVal === '') {
                e.preventDefault();
            }
        }
    }

    //Ketika update
    const listHandleClick = (e, id) => {
        const activityVal = e.target.innerText;
        if (activityVal) {
            setState({ ...state, activityVal, id });
        }
    }

    const onCancelHandle = () => {
        setState({ ...state, id: '', activityVal: '' })
    }


    return (
        <>
            <div className="container mt-4">
                <p className="h3">Activity List</p>
                <form onSubmit={(e) => submitHandle(e)}>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="mb-3">
                                <input type="text" name="activity" value={state.activityVal} onChange={(e) => onChangeHandle(e)} onKeyDown={(e) => keyDownHandle(e)} placeholder="Activity" className="form-control" autoFocus />
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="mb-3">
                                {/* <input type="submit" className="btn btn-primary" id="hide" value="Save" /> */}
                                <button type="submit" className="btn btn-primary">{state.id === '' ? 'Save' : 'Update'}</button>
                                {state.id !== '' && <input type="button" className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={() => onCancelHandle()} value="Cancel" />}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-2">
                        <ul className="list-group">
                            {state.data.map(d =>
                                <li onClick={(e) => listHandleClick(e, d.id)} className="list-group-item" >{d.activity} <button className="btn-close float-end" onClick={(e) => activityDeleteClickHandle(d.id)}></button></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Activity;
