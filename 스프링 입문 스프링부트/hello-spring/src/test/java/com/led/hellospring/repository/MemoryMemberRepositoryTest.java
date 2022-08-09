package com.led.hellospring.repository;

import com.led.hellospring.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

class MemoryMemberRepositoryTest {

    MemoryMemberRepository repository = new MemoryMemberRepository();

    @AfterEach
    public void afterEach() {   // 테스트가 순서 의존적으로 작동하지 않도록, 각각 테스트의 끝마다 repository 변수를 비워주어야 함.
        repository.clearStore();
    }

    @Test
    public void save() {
        Member member = new Member();
        member.setName("snuggle");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        //Assertions.assertEquals(member, result);
        assertThat(member).isEqualTo(result);
    }

    @Test
    public void findByName() {
        Member member1 = new Member();
        member1.setName("nuggle1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("nuggle2");
        repository.save(member2);

        Member result = repository.findByName("nuggle1").get();

        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll() {
        Member member1 = new Member();
        member1.setName("nuggle1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("nuggle2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }
}
