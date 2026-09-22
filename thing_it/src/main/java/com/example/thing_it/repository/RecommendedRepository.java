package com.example.thing_it.repository;

import com.example.thing_it.dto.DiseaseRecommendDto;
import com.example.thing_it.entity.Recommended;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecommendedRepository
        extends JpaRepository<Recommended, Long> {

   /* List<Recommended> findByDiseaseId(Long diseaseId);*/

    @Query("""
    select r.diseaseId as diseaseId, f.name as foodName ,f.effect as foodeffect ,f.nutrient as foodnutrient ,
        d.name as diseaseName
    from Recommended r
    join Food f on r.foodId = f.id
    join Disease d on r.diseaseId = d.id
    where r.diseaseId in :diseaseIds
    """)
    List<DiseaseRecommendDto.View> findByDiseaseIds(@Param("diseaseIds") List<Long> diseaseIds);
}