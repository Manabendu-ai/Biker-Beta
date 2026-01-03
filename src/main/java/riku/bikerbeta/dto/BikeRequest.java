package riku.bikerbeta.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BikeRequest {
    @NotNull
    private int bike_id;

    @NotEmpty
    private List<String> bike_desp;

    @NotEmpty
    private List<Double> spec;

    @NotBlank
    private String state;

    @Min(1975)
    private int year;
    private List<String> incentives;

    @Positive
    private double price;
}
