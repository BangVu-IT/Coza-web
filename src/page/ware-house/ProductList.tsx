import { Product } from '../../model/Product';

interface Props {
    product: Product;
    onRemove: () => void;
    onUpdate: () => void;
};

export function ProductList(props: Props) {
    return (
        <div className="san-pham">
            <div onClick={() => props.onRemove()} className="icon-xoa-san-pham">                
                <i className="fas fa-trash" />
            </div>
            <div className="anh-sp">
                <img src={props.product.image} alt="" />
            </div>
            <div className="thong-tin-sp">
                <div className="ten-sp">
                    {props.product.name}
                </div>
                <div className="hang-sp">
                    {props.product.brance}
                </div>
                <div className="gia-sp">
                    {props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <span><u>đ</u></span>
                </div>
                <div className="id-sp">
                </div>
                <div className="tinh-nang">
                    <button className="btn-sua-sp" onClick={() => props.onUpdate()}>Sửa sản phẩm</button>
                </div>
            </div>
        </div>
    )
}

