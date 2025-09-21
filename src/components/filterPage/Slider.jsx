import React, { useState } from "react";
import { Range } from "react-range";

const Slider = ({ values, setValues }) => {

    return (
        <div className="w-full">
            {/* title------------------------------ */}
            <div className='text-end mb-12'>
                <p className='text-[#7695FF] text-3xl mb-2'>وصفات حسب السعرات الحرارية لحصة واحدة</p>
                <p className='rubriqueTitle'></p>
            </div>

            {/* slider part------------------------- */}
            <div className="flex flex-col items-center justify-center bg-[#F5F5F5] rounded-[12px] p-6 mb-16">
                <div className="w-[90%] md:w-[65%] pb-6">
                    <div className="flex justify-between text-[#262F82] text-lg w-full mb-2">
                        <p>{values[0]} kcal</p>
                        <p>{values[1]} kcal</p>
                    </div>
                    <Range
                        step={100}
                        min={0}
                        max={700}
                        values={values}
                        onChange={setValues}
                        renderTrack={({ props, children }) => {
                            const { key, ...rest } = props;
                            return (
                                <div
                                    key={key}
                                    {...rest}
                                    style={{
                                        ...props.style,
                                        height: "6px",
                                        width: "100%",
                                        background: "linear-gradient(270deg, #FF4545 50%, #00E3FF 100%)",
                                        boxShadow: "0 4px 4px rgba(38, 47, 130, 0.25) inset",
                                        borderRadius: "12px",
                                    }}
                                >
                                    {children}
                                </div>
                            );
                        }}
                        renderThumb={({ props, isDragged }) => {
                            const { key, ...rest } = props;
                            return (
                                <div
                                    key={key}
                                    {...rest}
                                    style={{
                                        ...props.style,
                                        height: "28px",
                                        width: "28px",
                                        backgroundColor: "#fff",
                                        border: "1px solid #E2E9F1",
                                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                                        borderRadius: "50%",
                                        outline: "none",
                                        transition: "all 0.05s ease",
                                    }}
                                />
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Slider;


