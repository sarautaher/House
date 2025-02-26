export class House {

        id: number;
        attributes: {
          model: string;
          house_number: string;
          block_number: string;
          price: number;
          land_number: string;
          status: string;
          house_type: string;
        };
      
        constructor(data: any) {
          this.id = data.id;
          this.attributes = {
            model: data.attributes.model || '',
            house_number: data.attributes.house_number || '',
            block_number: data.attributes.block_number || '',
            price: data.attributes.price || 0,
            land_number: data.attributes.land_number || '',
            status: data.attributes.status || '',
            house_type: data.attributes.house_type || '',
          };
        }
      
      
}
