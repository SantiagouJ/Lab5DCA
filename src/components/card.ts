import { Products } from "../utils/types"
import { getData } from "../services/getData"
export class Card extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }
    
    connectedCallback(){
        this.render()
    }

    async render(){
        const data = await getData()
        console.log(data);
        if(this.shadowRoot){

            this.shadowRoot.innerHTML=`
        
                                <style>
                    .card{
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 20px;
                        padding: 20px;
                        margin:auto;
                    }
                    img{
                        width: 200px;
                        height: 200px;
                        object-fit: contain;
                    }
                    p{
                        font-size: 14px;
                        margin: 5px 0;
                    }
                    h1{
                        font-size: 20px;
                        margin: 10px 0;
                        text-align: center;
                    }
                    .card-item{
                        width: 400px;
                        min-height: 400px;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        padding: 15px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        background-color: white;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        transition: transform 0.2s;
                    }
                    .card-item:hover {
                        transform: translateY(-5px);
                    }
                    .card-item button{
                        background-color: #000;
                        color: #fff;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                </style>

                <div class="card">
                ${data.map((e:Products)=>`
                    <div class="card-item">
                    <h1>${e.title}</h1>
                    <img src="${e.image}" alt="">
                    <p>$${e.price}</p>
                    <p>Category: ${e.category}</p>
                    <p>Rating: ${e.rating.rate}/5</p>
                    <p>Reviews: ${e.rating.count}</p>
                    <button>Add to Cart</button>
                    </div>
                `).join("")}
                </div>
            `
        }
    }
    
}