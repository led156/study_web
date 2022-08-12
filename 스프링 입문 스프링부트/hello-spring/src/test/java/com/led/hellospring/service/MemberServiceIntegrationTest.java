package com.led.hellospring.service;

import com.led.hellospring.domain.Member;
import com.led.hellospring.repository.MemberRepository;
import com.led.hellospring.repository.MemoryMemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional //afterEach를 대신함. 트랜잭션을 실행하고, 테스트가 끝난뒤에 롤백해줌 -> 테스트 했던 데이터가 DB에 올라가지 않음.
class MemberServiceIntegrationTest {

    @Autowired MemberService memberService; // 테스이므로, 생성자 대신 필드기반으로 받기.
    @Autowired MemberRepository memberRepository;

    @Test
    void join() {
        Member member = new Member();
        member.setName("spring3");

        Long saveId = memberService.join(member);

        Member findMember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
    }

    @Test
    public void 중복_회원_예외() {
        // given
        Member member1 = new Member();
        member1.setName("spring3");

        Member member2 = new Member();
        member2.setName("spring3");

        // when
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
    }
}