import { DataTypes, Model } from "sequelize";
import db from "../config/databaseConfig";
import { HotelBrandInstance } from "./brand";
interface HotelListingAttributes {
  name: string;
  city: string;
  address: string;
  country: string;
  rating?: string;
  id: string;
}

export class HotelListingInstance extends Model<HotelListingAttributes> {}

HotelListingInstance.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "Listings",
  }
);

HotelListingInstance.hasMany(HotelBrandInstance, {
  foreignKey: "hotelID",
  as: "Brands",
});

HotelBrandInstance.belongsTo(HotelListingInstance, {
  foreignKey: "hotelID",
  as: "Listings",
});
