package riku.bikerbeta.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BikeResponse {

    private ObjectId id;
    private Integer bikeId;
    private List<String> bikeDesp;
    private List<Double> spec;
    private String state;
    private int year;
    private List<String> incentives;
    private double price;
    private String imgUrl;
}
