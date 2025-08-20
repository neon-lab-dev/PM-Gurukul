
type TUploadedProofs = {
    docName: string;
    docImageFront: string;
    docImageBack: string;
    panCardImage: string;
    passBookImage: string;
}

const UploadedProofs: React.FC<TUploadedProofs> = ({ docName, docImageFront, docImageBack, panCardImage, passBookImage }) => {
    console.log(passBookImage);
    const paragraphStyle = "text-neutral-90";
    const imageStyle = "w-full mt-1 rounded-xl border border-neutral-65/40 min-h-[170px]";
    return (
        <div>
            <p className="text-neutral-90 font-semibold">Uploaded Proofs</p>
            <div className="bg-white w-full rounded-2xl p-6">
                <div className="flex flex-col w-full gap-5 text-neutral-65">
                    <div className="flex justify-between gap-2">
                        <div className="w-1/2">
                            <p>{docName} Front Side</p>
                            {
                                docImageFront ?
                                    <img src={docImageFront} alt="" className={imageStyle} />
                                    :
                                    <p className={paragraphStyle}>No document submitted</p>
                            }
                        </div>
                        <div className="w-1/2">
                            <p>{docName} Back Side</p>
                            {
                                docImageBack ?
                                    <img src={docImageBack} alt="" className={imageStyle} />
                                    :
                                    <p className={paragraphStyle}>No document submitted</p>
                            }
                        </div>

                    </div>


                    <div className="flex justify-between gap-2">
                        <div className="w-1/2">
                            <p>PAN Card</p>
                            {
                                panCardImage ?
                                    <img src={panCardImage} alt="" className={imageStyle} />
                                    :
                                    <p className={paragraphStyle}>No document submitted</p>
                            }
                        </div>
                        {/* <div className="w-1/2">
                            <p>Pass Book Image</p>
                            {
                                passBookImage ?
                                    <img src={passBookImage} alt="" className={imageStyle} />
                                    :
                                    <p className={paragraphStyle}>No document submitted</p>
                            }
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadedProofs;