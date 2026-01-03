package riku.bikerbeta.service.impl;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import riku.bikerbeta.dto.BikeRequest;
import riku.bikerbeta.dto.BikeResponse;
import riku.bikerbeta.model.Bike;
import riku.bikerbeta.repository.BikeRepo;
import riku.bikerbeta.service.BikeService;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
public class BikeServiceImpl implements BikeService {

    @Autowired
    private BikeRepo repo;
    @Autowired
    private S3Client s3Client;
    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file) {
        String file_name_extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        String key = UUID.randomUUID().toString() + "." + file_name_extension;
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();
            PutObjectResponse response = s3Client.putObject(
                    putObjectRequest, RequestBody.fromBytes(file.getBytes())
            );
            if (response.sdkHttpResponse().isSuccessful()) {
                return "https://" + bucketName + ".s3.amazonaws.com/" + key;
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "File Upload Failed!"
                );
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error Occurred While uploading the file!"
            );
        }
    }

    @Override
    public BikeResponse addBike(BikeRequest req, MultipartFile file) {
        Bike bike = convertEntity(req);
        String imageUrl = uploadFile(file);
        bike.setImg_url(imageUrl);
        bike = repo.save(bike);
        return convertResponse(bike);
    }

    @Override
    public List<BikeResponse> getAllBikes() {
        List<Bike> bikes = repo.findAll();
        return bikes.stream().
                map(x -> convertResponse(x)).
                collect(Collectors.toList());
    }

    @Override
    public BikeResponse getBikeById(int bike_id) {
        List<Bike> bikes = repo.findByBikeId(bike_id);
        if(bikes == null || bikes.isEmpty()){
            return null;
        }
        return convertResponse(bikes.getFirst());
    }

    @Override
    public boolean deleteFile(String file_name) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest
                .builder()
                .bucket(bucketName)
                .key(file_name)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void DeleteBikeById(int bike_id) {
        BikeResponse bike = getBikeById(bike_id);
        String img_url = bike.getImgUrl();
        String file_name = img_url.substring(img_url.lastIndexOf("/") + 1);
        boolean isFileDelete = deleteFile(file_name);
        if(isFileDelete){
            repo.deleteById(bike.getId());
        }
    }

    private Bike convertEntity(BikeRequest req){
        return Bike.builder()
                .bikeId(req.getBike_id())
                .bikeDesp(req.getBike_desp())
                .spec(req.getSpec())
                .state(req.getState())
                .year(req.getYear())
                .incentives(req.getIncentives())
                .price(req.getPrice())
                .build();

    }


    private BikeResponse convertResponse(Bike bike){
        return BikeResponse.builder()
                .id(bike.getId())
                .bikeId(bike.getBikeId())
                .bikeDesp(bike.getBikeDesp())
                .spec(bike.getSpec())
                .year(bike.getYear())
                .imgUrl(bike.getImg_url())
                .price(bike.getPrice())
                .state(bike.getState())
                .build();
    }
}
