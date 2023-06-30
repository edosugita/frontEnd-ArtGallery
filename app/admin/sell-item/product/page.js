import LayoutsAdmin from '@/components/Layouts/Admin/Layouts'
import React from 'react'

export default function AddProduct() {
    return (
        <LayoutsAdmin>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Add Product For Sale</h5>
                    </div>
                    <hr />
                    <div className="m-t-10">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="userName">Art Name:</label>
                                    <input type="text" className="form-control" id="userName" placeholder="The Starry Night" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="userName">Artist:</label>
                                    <input type="text" className="form-control" id="userName" placeholder="Vincent van Gogh" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="userName">Dimension:</label>
                                    <input type="text" className="form-control" id="userName" placeholder="T74 cm x 92 cm" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="userName">Price:</label>
                                    <input type="text" className="form-control" id="userName" placeholder="10000000" />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="userName">Category:</label>
                                    <input type="text" className="form-control" id="userName" placeholder="Category1,Category2,Category3" />
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="userName">Image:</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="customFile" />
                                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <div className="form-group">
                                    <label className="font-weight-semibold" htmlFor="userName">Description:</label>
                                    <div id="editor">
                                        <p>Hello World!</p>
                                        <p>Some initial <strong>bold</strong> text</p>
                                        <p><br /></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <div className="d-flex align-items-center justify-content-between p-t-15">
                                        <button className="btn btn-primary w-100">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutsAdmin>
    )
}
