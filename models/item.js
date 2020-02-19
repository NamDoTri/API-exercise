class Item{
    constructor(id, title, desc, category, location, images, price, date, deliveryType, sellerName){
        this.id = id;
        this.title = title;
        this.description = desc;
        this.category = category;
        this.location = location;
        this.images = images;
        this.price = price;
        this.datePosted = date;
        this.deliveryType = deliveryType;
        this.seller = sellerName;
    }
}

module.exports = Item;