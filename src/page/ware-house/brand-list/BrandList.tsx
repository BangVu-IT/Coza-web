import React, { useEffect, useState } from "react";
import { productController } from "../../../controller/ProductController";
import { Brand } from "../../../model/Product";
import DataBrand from "./DataBrand";

export default function BrandList() {
  const [data, setData] = useState<Brand[]>([]);
  const [brandUpdate, setBrandUpdate] = useState<Brand>({
    brand_id: "",
    brand: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setBrandUpdate({
      brand_id: "",
      brand: "",
    })
  };

  useEffect(() => {
    getBrandList();
  }, []);

  const getBrandList = () => {
    productController.productBrandList().then((res) => {
      setData(res);      
    });
  };

  const onAddBrand = (brand: Brand) => {
    if (brandUpdate.brand_id != "") {          
      productController.updateProductBrand(brand).then(res => {
        getBrandList()
      })
    } else {
      productController.addProductBrand(brand).then(res => {
        getBrandList()
      })
    }
  }

  const onDeleteBrand = (id: string) => {    
    productController.deleteProductBrand(id).then(res => {
      getBrandList()
    })
  };

  const onUpdateBrand = (brand: Brand) => {
    setBrandUpdate(brand)
  };

  return <DataBrand brandList={data} onAddBrand={onAddBrand} onUpdateBrand={onUpdateBrand} brandUpdate={brandUpdate} open={open} handleOpen={handleOpen} handleClose={handleClose} onDeleteBrand={onDeleteBrand} />;
}
