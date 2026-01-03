package riku.bikerbeta.controller;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import riku.bikerbeta.dto.BikeRequest;
import riku.bikerbeta.dto.BikeResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import riku.bikerbeta.service.BikeService;
import riku.bikerbeta.service.impl.BikeServiceImpl;

import java.util.List;


@RestController
@RequestMapping("/api/bikes")
@AllArgsConstructor
public class BikeController {

    @Autowired
    private ObjectMapper objectMapper;
    private BikeService bikeService;

    @PostMapping("/")
    public ResponseEntity<BikeResponse> addBike(
            @RequestPart("bike") String bikeString,
            @RequestPart("file") MultipartFile file
    ){
        BikeRequest request = null;
        try{
            request = objectMapper.readValue(bikeString, BikeRequest.class);

        }catch (JsonProcessingException exception){
            return ResponseEntity.badRequest().build();
        }
        BikeResponse bikeResponse = bikeService.addBike(request, file);
        return ResponseEntity.ok(bikeResponse);
    }

    @GetMapping("/")
    public ResponseEntity<List<BikeResponse>> getALlBikes(){
        return ResponseEntity.ok(bikeService.getAllBikes());
    }

    @GetMapping("/{bike_id}")
    public ResponseEntity<BikeResponse> getBikeById(
            @PathVariable("bike_id") int bike_id
    ){
        return ResponseEntity.ok(bikeService.getBikeById(bike_id));
    }

    @DeleteMapping("/{bike_id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBike(
            @PathVariable("bike_id") int bike_id
    ){
        bikeService.DeleteBikeById(bike_id);
    }
}
