package com.led.hellospring.repository;

import com.led.hellospring.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataJpaMemberRepository extends JpaRepository<Member, Long>, MemberRepository { // JpaRepository를 지니고 있으면, 자동으로 스프링 빈으로 등록된다.

    @Override
    Optional<Member> findByName(String name);

}
