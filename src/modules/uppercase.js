export default function uppercase(){

    const Convert = (symbol) =>{
        let x = symbol.split(" ");
        for (let i = 0; i < x.length; i ++){
          x[i] = x[i].charAt(0).toUpperCase() + x[i].slice(1);
        }
         return x.join(" ");
        
    }
     return { Convert } 
}