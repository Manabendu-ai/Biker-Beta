package riku.bikerbeta.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "bikerbeta")
public class Bike {
    @Id
    private ObjectId id;
    @Field(name = "bike_id")
    private int bikeId;
    @Field(name = "bike_desp")
    private List<String> bikeDesp;
    private List<Double> spec;
    private String state;
    private int year;
    private List<String> incentives;
    private double price;
    private String img_url;
}
