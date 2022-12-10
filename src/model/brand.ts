import { DataTypes, Model } from "sequelize";
import db from "../config/databaseConfig";

interface HotelBrandAttributes {
  name: string;
  id: string;
  hotelID: string;
}

export class HotelBrandInstance extends Model<HotelBrandAttributes> {}

HotelBrandInstance.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    hotelID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Brands",
  }
);

