import React from 'react';
import {isEmpty} from "lodash/lang";

const CustomCard = ({cardContent, children}) => {

    return <div className="card">
        <div className="card-title h5 p-3">
            <div className={"d-flex justify-content-between flex-column"}>
                <div className="d-flex align-items-center">{cardContent.title}</div>
                <div className="text-muted font-small ">{cardContent.subTitle}</div>
            </div>
        </div>
        <div className="card-body">
            <div className="d-flex align-items-center justify-content-center">
                {isEmpty(cardContent.img) || isEmpty(cardContent.icon) &&
                    <div style={{minWidth: "5rem"}} className=" card-img-primary rounded-circle d-flex align-items-center justify-content-center">
                        {cardContent.icon && <i className={cardContent.icon}></i>}
                        {cardContent.img && <img src={cardContent.img}/>}
                    </div>}
                {children}
            </div>
        </div>

    </div>
};

export default CustomCard;
