package riku.bikerbeta.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import riku.bikerbeta.dto.BikeRequest;
import riku.bikerbeta.dto.BikeResponse;
import riku.bikerbeta.model.Bike;

import java.util.List;

@Service
public interface BikeService {
    String uploadFile(MultipartFile file);

    BikeResponse addBike(BikeRequest req, MultipartFile file);

    List<BikeResponse> getAllBikes();

    BikeResponse getBikeById(int bike_id);

    boolean deleteFile(String file_name);

    void DeleteBikeById(int bike_id);
}
