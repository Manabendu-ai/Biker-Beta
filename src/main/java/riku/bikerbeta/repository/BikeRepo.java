package riku.bikerbeta.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import riku.bikerbeta.dto.BikeResponse;
import riku.bikerbeta.model.Bike;

import java.util.List;

public interface BikeRepo extends MongoRepository<Bike, ObjectId> {
    List<Bike> findByBikeId(int bike_id);
}
