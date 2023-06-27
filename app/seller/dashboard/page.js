import LayoutsSeller from "@/components/Layouts/Seller/Layouts";

export default function Dashboard() {
    return (
        <LayoutsSeller>
            <>
                <div className="row">
                    <div className="col-md-6 col-lg-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="m-b-0">Products</p>
                                        <h2 className="m-b-0">
                                            <span>$14,966</span>
                                        </h2>
                                    </div>
                                    <div className="avatar avatar-icon avatar-lg avatar-blue">
                                        <i className="fas fa-database"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="m-b-0">Auction Items</p>
                                        <h2 className="m-b-0">
                                            <span>26.80%</span>
                                        </h2>
                                    </div>
                                    <div className="avatar avatar-icon avatar-lg avatar-cyan">
                                        <i className="fas fa-gavel"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="m-b-0">Discounted Items</p>
                                        <h2 className="m-b-0">
                                            <span>3057</span>
                                        </h2>
                                    </div>
                                    <div className="avatar avatar-icon avatar-lg avatar-red">
                                        <i className="fas fa-tag"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="m-b-0">Total Income</p>
                                        <h2 className="m-b-0">
                                            <span>$6,138</span>
                                        </h2>
                                    </div>
                                    <div className="avatar avatar-icon avatar-lg avatar-gold">
                                        <i className="fas fa-wallet"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </LayoutsSeller>
    )
}
