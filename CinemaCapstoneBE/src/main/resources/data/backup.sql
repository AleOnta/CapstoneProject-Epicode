PGDMP     	                    {           CapstoneProject_cinema    15.2    15.2 J    Y           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Z           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            [           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            \           1262    156520    CapstoneProject_cinema    DATABASE     �   CREATE DATABASE "CapstoneProject_cinema" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Italian_Italy.1252';
 (   DROP DATABASE "CapstoneProject_cinema";
                postgres    false            �            1259    167359    cinema_movie    TABLE     ]  CREATE TABLE public.cinema_movie (
    id bigint NOT NULL,
    budget integer NOT NULL,
    cast_path character varying(255) NOT NULL,
    film_length integer NOT NULL,
    genre character varying(255) NOT NULL,
    plot character varying(1234) NOT NULL,
    popularity double precision NOT NULL,
    poster_path character varying(255) NOT NULL,
    prod_company character varying(255) NOT NULL,
    release_date date NOT NULL,
    revenue bigint NOT NULL,
    title character varying(255) NOT NULL,
    tmdb_id bigint NOT NULL,
    vote double precision NOT NULL,
    trailerid character varying(255)
);
     DROP TABLE public.cinema_movie;
       public         heap    postgres    false            �            1259    167358    cinema_movie_id_seq    SEQUENCE     |   CREATE SEQUENCE public.cinema_movie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.cinema_movie_id_seq;
       public          postgres    false    215            ]           0    0    cinema_movie_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.cinema_movie_id_seq OWNED BY public.cinema_movie.id;
          public          postgres    false    214            �            1259    175319    cinema_news    TABLE     �   CREATE TABLE public.cinema_news (
    id bigint NOT NULL,
    article character varying(1234) NOT NULL,
    author character varying(255) NOT NULL,
    redact_date date NOT NULL,
    title character varying(255) NOT NULL,
    related_movie_id bigint
);
    DROP TABLE public.cinema_news;
       public         heap    postgres    false            �            1259    175318    cinema_news_id_seq    SEQUENCE     {   CREATE SEQUENCE public.cinema_news_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.cinema_news_id_seq;
       public          postgres    false    228            ^           0    0    cinema_news_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.cinema_news_id_seq OWNED BY public.cinema_news.id;
          public          postgres    false    227            �            1259    167377    cinema_program    TABLE     �   CREATE TABLE public.cinema_program (
    id bigint NOT NULL,
    from_date date NOT NULL,
    price character varying,
    status character varying(255) NOT NULL,
    to_date date NOT NULL,
    movie_id bigint,
    room_id bigint
);
 "   DROP TABLE public.cinema_program;
       public         heap    postgres    false            �            1259    167376    cinema_program_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.cinema_program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.cinema_program_id_seq;
       public          postgres    false    217            _           0    0    cinema_program_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.cinema_program_id_seq OWNED BY public.cinema_program.id;
          public          postgres    false    216            �            1259    167384    cinema_room    TABLE     �   CREATE TABLE public.cinema_room (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    normal_seats integer NOT NULL,
    timetables character varying(255) NOT NULL,
    total_seats integer NOT NULL,
    vip_seats integer NOT NULL
);
    DROP TABLE public.cinema_room;
       public         heap    postgres    false            �            1259    167383    cinema_room_id_seq    SEQUENCE     {   CREATE SEQUENCE public.cinema_room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.cinema_room_id_seq;
       public          postgres    false    219            `           0    0    cinema_room_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.cinema_room_id_seq OWNED BY public.cinema_room.id;
          public          postgres    false    218            �            1259    167393    cinema_ticket    TABLE     4  CREATE TABLE public.cinema_ticket (
    id bigint NOT NULL,
    emit_date date NOT NULL,
    hours character varying(5) NOT NULL,
    per_date date NOT NULL,
    seat_code character varying(255) NOT NULL,
    bound_film_id bigint,
    bound_room_id bigint,
    owner_id bigint,
    price double precision
);
 !   DROP TABLE public.cinema_ticket;
       public         heap    postgres    false            �            1259    167392    cinema_ticket_id_seq    SEQUENCE     }   CREATE SEQUENCE public.cinema_ticket_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.cinema_ticket_id_seq;
       public          postgres    false    221            a           0    0    cinema_ticket_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.cinema_ticket_id_seq OWNED BY public.cinema_ticket.id;
          public          postgres    false    220            �            1259    167400    roles    TABLE     \   CREATE TABLE public.roles (
    id bigint NOT NULL,
    role_name character varying(255)
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    167399    roles_id_seq    SEQUENCE     u   CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    223            b           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    222            �            1259    167407    users    TABLE     [  CREATE TABLE public.users (
    id bigint NOT NULL,
    birthdate date NOT NULL,
    cinema_points integer NOT NULL,
    email character varying(255) NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    username character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    167406    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    225            c           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    224            �            1259    167415    users_roles    TABLE     ^   CREATE TABLE public.users_roles (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);
    DROP TABLE public.users_roles;
       public         heap    postgres    false            �           2604    167362    cinema_movie id    DEFAULT     r   ALTER TABLE ONLY public.cinema_movie ALTER COLUMN id SET DEFAULT nextval('public.cinema_movie_id_seq'::regclass);
 >   ALTER TABLE public.cinema_movie ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    175322    cinema_news id    DEFAULT     p   ALTER TABLE ONLY public.cinema_news ALTER COLUMN id SET DEFAULT nextval('public.cinema_news_id_seq'::regclass);
 =   ALTER TABLE public.cinema_news ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    167380    cinema_program id    DEFAULT     v   ALTER TABLE ONLY public.cinema_program ALTER COLUMN id SET DEFAULT nextval('public.cinema_program_id_seq'::regclass);
 @   ALTER TABLE public.cinema_program ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    167387    cinema_room id    DEFAULT     p   ALTER TABLE ONLY public.cinema_room ALTER COLUMN id SET DEFAULT nextval('public.cinema_room_id_seq'::regclass);
 =   ALTER TABLE public.cinema_room ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    167396    cinema_ticket id    DEFAULT     t   ALTER TABLE ONLY public.cinema_ticket ALTER COLUMN id SET DEFAULT nextval('public.cinema_ticket_id_seq'::regclass);
 ?   ALTER TABLE public.cinema_ticket ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    167403    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    167410    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            I          0    167359    cinema_movie 
   TABLE DATA           �   COPY public.cinema_movie (id, budget, cast_path, film_length, genre, plot, popularity, poster_path, prod_company, release_date, revenue, title, tmdb_id, vote, trailerid) FROM stdin;
    public          postgres    false    215   y[       V          0    175319    cinema_news 
   TABLE DATA           `   COPY public.cinema_news (id, article, author, redact_date, title, related_movie_id) FROM stdin;
    public          postgres    false    228   9s       K          0    167377    cinema_program 
   TABLE DATA           b   COPY public.cinema_program (id, from_date, price, status, to_date, movie_id, room_id) FROM stdin;
    public          postgres    false    217   �v       M          0    167384    cinema_room 
   TABLE DATA           a   COPY public.cinema_room (id, name, normal_seats, timetables, total_seats, vip_seats) FROM stdin;
    public          postgres    false    219   �w       O          0    167393    cinema_ticket 
   TABLE DATA           �   COPY public.cinema_ticket (id, emit_date, hours, per_date, seat_code, bound_film_id, bound_room_id, owner_id, price) FROM stdin;
    public          postgres    false    221   <x       Q          0    167400    roles 
   TABLE DATA           .   COPY public.roles (id, role_name) FROM stdin;
    public          postgres    false    223   c�       S          0    167407    users 
   TABLE DATA           m   COPY public.users (id, birthdate, cinema_points, email, firstname, lastname, password, username) FROM stdin;
    public          postgres    false    225   ��       T          0    167415    users_roles 
   TABLE DATA           7   COPY public.users_roles (user_id, role_id) FROM stdin;
    public          postgres    false    226   �       d           0    0    cinema_movie_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.cinema_movie_id_seq', 26, true);
          public          postgres    false    214            e           0    0    cinema_news_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.cinema_news_id_seq', 12, true);
          public          postgres    false    227            f           0    0    cinema_program_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.cinema_program_id_seq', 9, true);
          public          postgres    false    216            g           0    0    cinema_room_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cinema_room_id_seq', 3, true);
          public          postgres    false    218            h           0    0    cinema_ticket_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cinema_ticket_id_seq', 575, true);
          public          postgres    false    220            i           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 2, true);
          public          postgres    false    222            j           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 15, true);
          public          postgres    false    224            �           2606    167366    cinema_movie cinema_movie_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.cinema_movie
    ADD CONSTRAINT cinema_movie_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.cinema_movie DROP CONSTRAINT cinema_movie_pkey;
       public            postgres    false    215            �           2606    175326    cinema_news cinema_news_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cinema_news
    ADD CONSTRAINT cinema_news_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.cinema_news DROP CONSTRAINT cinema_news_pkey;
       public            postgres    false    228            �           2606    167382 "   cinema_program cinema_program_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.cinema_program
    ADD CONSTRAINT cinema_program_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.cinema_program DROP CONSTRAINT cinema_program_pkey;
       public            postgres    false    217            �           2606    167391    cinema_room cinema_room_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cinema_room
    ADD CONSTRAINT cinema_room_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.cinema_room DROP CONSTRAINT cinema_room_pkey;
       public            postgres    false    219            �           2606    167398     cinema_ticket cinema_ticket_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.cinema_ticket
    ADD CONSTRAINT cinema_ticket_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.cinema_ticket DROP CONSTRAINT cinema_ticket_pkey;
       public            postgres    false    221            �           2606    167405    roles roles_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    223            �           2606    175317 !   users uk6dotkott2kjsp8vw4d0m25fb7 
   CONSTRAINT     ]   ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7;
       public            postgres    false    225            �           2606    175328 (   cinema_news uk_1qco5v8lp5up54cn91xd75p3i 
   CONSTRAINT     d   ALTER TABLE ONLY public.cinema_news
    ADD CONSTRAINT uk_1qco5v8lp5up54cn91xd75p3i UNIQUE (title);
 R   ALTER TABLE ONLY public.cinema_news DROP CONSTRAINT uk_1qco5v8lp5up54cn91xd75p3i;
       public            postgres    false    228            �           2606    167433 "   users uk_6dotkott2kjsp8vw4d0m25fb7 
   CONSTRAINT     ^   ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);
 L   ALTER TABLE ONLY public.users DROP CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7;
       public            postgres    false    225            �           2606    167421 )   cinema_movie uk_77clbwjskrme6r9sl85j4jn0t 
   CONSTRAINT     i   ALTER TABLE ONLY public.cinema_movie
    ADD CONSTRAINT uk_77clbwjskrme6r9sl85j4jn0t UNIQUE (cast_path);
 S   ALTER TABLE ONLY public.cinema_movie DROP CONSTRAINT uk_77clbwjskrme6r9sl85j4jn0t;
       public            postgres    false    215            �           2606    167431 (   cinema_room uk_flpjcmjooesyip3v41d98mawa 
   CONSTRAINT     c   ALTER TABLE ONLY public.cinema_room
    ADD CONSTRAINT uk_flpjcmjooesyip3v41d98mawa UNIQUE (name);
 R   ALTER TABLE ONLY public.cinema_room DROP CONSTRAINT uk_flpjcmjooesyip3v41d98mawa;
       public            postgres    false    219            �           2606    167427 )   cinema_movie uk_gugdtwth4nfqne61a3xppnhmc 
   CONSTRAINT     g   ALTER TABLE ONLY public.cinema_movie
    ADD CONSTRAINT uk_gugdtwth4nfqne61a3xppnhmc UNIQUE (tmdb_id);
 S   ALTER TABLE ONLY public.cinema_movie DROP CONSTRAINT uk_gugdtwth4nfqne61a3xppnhmc;
       public            postgres    false    215            �           2606    167425 )   cinema_movie uk_pylxw4aj0lt3psxqmxmla292v 
   CONSTRAINT     e   ALTER TABLE ONLY public.cinema_movie
    ADD CONSTRAINT uk_pylxw4aj0lt3psxqmxmla292v UNIQUE (title);
 S   ALTER TABLE ONLY public.cinema_movie DROP CONSTRAINT uk_pylxw4aj0lt3psxqmxmla292v;
       public            postgres    false    215            �           2606    167423 )   cinema_movie uk_q83m5ghjc8jutiuysh2uom0yk 
   CONSTRAINT     k   ALTER TABLE ONLY public.cinema_movie
    ADD CONSTRAINT uk_q83m5ghjc8jutiuysh2uom0yk UNIQUE (poster_path);
 S   ALTER TABLE ONLY public.cinema_movie DROP CONSTRAINT uk_q83m5ghjc8jutiuysh2uom0yk;
       public            postgres    false    215            �           2606    167435 "   users uk_r43af9ap4edm43mmtq01oddj6 
   CONSTRAINT     a   ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_r43af9ap4edm43mmtq01oddj6 UNIQUE (username);
 L   ALTER TABLE ONLY public.users DROP CONSTRAINT uk_r43af9ap4edm43mmtq01oddj6;
       public            postgres    false    225            �           2606    175315 !   users ukr43af9ap4edm43mmtq01oddj6 
   CONSTRAINT     `   ALTER TABLE ONLY public.users
    ADD CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT ukr43af9ap4edm43mmtq01oddj6;
       public            postgres    false    225            �           2606    167414    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    225            �           2606    167419    users_roles users_roles_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT users_roles_pkey PRIMARY KEY (user_id, role_id);
 F   ALTER TABLE ONLY public.users_roles DROP CONSTRAINT users_roles_pkey;
       public            postgres    false    226    226            �           2606    167471 '   users_roles fk2o0jvgh89lemvvo17cbqvdxaa    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fk2o0jvgh89lemvvo17cbqvdxaa FOREIGN KEY (user_id) REFERENCES public.users(id);
 Q   ALTER TABLE ONLY public.users_roles DROP CONSTRAINT fk2o0jvgh89lemvvo17cbqvdxaa;
       public          postgres    false    225    226    3243            �           2606    167456 )   cinema_ticket fk828tytltjoijh3k0txodnxx4i    FK CONSTRAINT     �   ALTER TABLE ONLY public.cinema_ticket
    ADD CONSTRAINT fk828tytltjoijh3k0txodnxx4i FOREIGN KEY (bound_room_id) REFERENCES public.cinema_room(id);
 S   ALTER TABLE ONLY public.cinema_ticket DROP CONSTRAINT fk828tytltjoijh3k0txodnxx4i;
       public          postgres    false    219    3227    221            �           2606    167451 )   cinema_ticket fkfc9u8vr2f0wp89g8rkj3nqawv    FK CONSTRAINT     �   ALTER TABLE ONLY public.cinema_ticket
    ADD CONSTRAINT fkfc9u8vr2f0wp89g8rkj3nqawv FOREIGN KEY (bound_film_id) REFERENCES public.cinema_movie(id);
 S   ALTER TABLE ONLY public.cinema_ticket DROP CONSTRAINT fkfc9u8vr2f0wp89g8rkj3nqawv;
       public          postgres    false    221    3215    215            �           2606    167461 )   cinema_ticket fkinlvxor13dh4vgy9gmvdx5ydb    FK CONSTRAINT     �   ALTER TABLE ONLY public.cinema_ticket
    ADD CONSTRAINT fkinlvxor13dh4vgy9gmvdx5ydb FOREIGN KEY (owner_id) REFERENCES public.users(id);
 S   ALTER TABLE ONLY public.cinema_ticket DROP CONSTRAINT fkinlvxor13dh4vgy9gmvdx5ydb;
       public          postgres    false    225    221    3243            �           2606    167466 '   users_roles fkj6m8fwv7oqv74fcehir1a9ffy    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT fkj6m8fwv7oqv74fcehir1a9ffy FOREIGN KEY (role_id) REFERENCES public.roles(id);
 Q   ALTER TABLE ONLY public.users_roles DROP CONSTRAINT fkj6m8fwv7oqv74fcehir1a9ffy;
       public          postgres    false    3233    226    223            �           2606    167441 *   cinema_program fkl7o3ce1sm1v8o3oqi26laohav    FK CONSTRAINT     �   ALTER TABLE ONLY public.cinema_program
    ADD CONSTRAINT fkl7o3ce1sm1v8o3oqi26laohav FOREIGN KEY (movie_id) REFERENCES public.cinema_movie(id);
 T   ALTER TABLE ONLY public.cinema_program DROP CONSTRAINT fkl7o3ce1sm1v8o3oqi26laohav;
       public          postgres    false    217    215    3215            �           2606    175329 '   cinema_news fks4rpjnoa2p7x7tmiq5ennxpfx    FK CONSTRAINT     �   ALTER TABLE ONLY public.cinema_news
    ADD CONSTRAINT fks4rpjnoa2p7x7tmiq5ennxpfx FOREIGN KEY (related_movie_id) REFERENCES public.cinema_movie(id);
 Q   ALTER TABLE ONLY public.cinema_news DROP CONSTRAINT fks4rpjnoa2p7x7tmiq5ennxpfx;
       public          postgres    false    215    228    3215            �           2606    167446 *   cinema_program fkspt2cn4m9h43bt680rsupq9wj    FK CONSTRAINT     �   ALTER TABLE ONLY public.cinema_program
    ADD CONSTRAINT fkspt2cn4m9h43bt680rsupq9wj FOREIGN KEY (room_id) REFERENCES public.cinema_room(id);
 T   ALTER TABLE ONLY public.cinema_program DROP CONSTRAINT fkspt2cn4m9h43bt680rsupq9wj;
       public          postgres    false    217    219    3227            I      x��ZIr#�r]'O��7#Q9!�Fp(�#8���� DN� h\�!�B���:�n�'�s�LU���~[u�!��ϟ��c9m�����~�k����\��,,��~�TIY���H&�,��i�µ���c�LE9�j"d
)F�O:U鹊�B6�^U^ʹ���X̔.JQ�"We���(�K���xW����O����"��T�iUк�|-V3��}�y�9I��6�+b��8Z��,R-�q�e;��uٹ?ꬳ��8z9
_���M��>{
��k6��e.�JJ˵]o���\�~��~ϵ��
GH�B��8��?}�i��ӆ�ݢ��)�N��։�Љ~�{:9��,��ػ��z��io۳��<O�uQ�|�1��:�TnI\*��f�햗�]�϶?|K�1Y����,�X&�B'8L���TL��Ŧb�����z�&fiQ���i�^TI_ep�8]��>!Ř��U��F�����x�����B���T��$�iH�+���C��,�my~��:��^��N�ד�e���r��ޟ����;�����������aR�t����=�m� �tk��\����X����������b�ɋ��o�����=����K�dハ�\��z��/��z�l6��,a8X&����v�i:Kģ�[�2I �j�`7��z:C9Z� ��I�+�+ȰJ�f�	��Y5���cL�SX/H����bD�6KW*� 6di��	�N�{L�t���ؑ�+gQWaGr�>$@�g���@4�b-��!�^���ֹ����;����|�O�����Me�qc����r���nnX[}�eG�2^��zp�������_�N۪Y�|��z�`�;|���X���	,���g{�i��*���	>��0l'��\I:L��A���h��,���ۯ� Ӎ��~���Nٞ畞j!��2��,�!LW�3s�k���tf��l.65>!������F�AFCz�=y�Be��.�� *�|^jö�J����t-˳����������48���+`�a��;hO�{�>�a��Z�ɤ��%�
t�۱�8�g��}����g�����H�ZY�i���5L�G�s4��Hw�mo\�fA�3,�6H����'������B��
�_!� ����<��v�l�d��]I9�c�aV*ì�����p%T�˕1|��3Ԙ�9MTM�:pvK�E��Rl��'"IK�h��D�(�1"�@�F�]�^!��.s��X1�AP&�ҏ�+��j��+%�I��7��zA��	:���=���*�����ݥ�N�n;'{�Y�HܕU����L-u"����L�4�خE��6B���۵>МHF�m-RD��e\hu[nг*�}vp|{���t��ۛ��8����	�M�n�m4�k ˢN\L�)�� ��l�E��&��n�	�� �����Z����L���o�NL�l�K���J>�aK0v�7>�~�H�	�e$�mI�0��2�����ӕ�Y����H�e���j��r�.��۶��g~�ŋ�p�9x9Oίխ����=x��x��&�)piM�n�Axz��uj}aqTAJ5�K��2���V�۳^t�����X�;]��8�����%^�"^�(JWF*"�H�������5ǧ���m�8��ʗz�¢�=T�c�s��<E^�y��R����QJ�N��n�����qU.緷�t���`�>��x��W/"���ݶ��=��X���2WUy�c�:~�i���Cnҵ;N�SA؍96f 6�k�Fvfc$!�G)��ʀJj��}|� }�/��V�����US����"�]h$9�oK:m������ݽ�C�y�|=�ç��r��z��y��S���� xg�M?��E��~�����1��s��~#�������e,��/��u�G�ިa����gjZ�BV`�|��,P
�:2Q4�	�:7�j3��\#�b��9.�;Oч��H!��t�p*S~�f�7��/F"ɲ��-j'�5Y��gl��c*hb�YP��A��{',J��\����E�v����~x_���}�>�G�q;�?\��.!�5��>�����vۏ����q���:�]�K��(��P�1= �]k������/��c[��I�^�t�8�w7M���WKLɺ�{�)k���:�!O�!�� �8��-���ȍef����cu����pwJ�U��|��{M
�F<�/I햸LW��%([@�I����|�f ce�X��,�Ƀ�7d�Z	`�j���N�AQ3	e�ɂ�,H��(D&�R�aLB��S�k$򄦪	{��69k���!��M��r]\�O~7���q2h����2bI�ر�-����G�/��ک�ǯW��C�t�L�]��q��� П��}�6���������jd����n�t����I�A�+S��A��kA�ز��IIv��(8�T�D�́�>�� @uQ���,�����H�����3T����wQQh��!G�X%$i-o��� yFuS���	�;'5ߜx���7]��IX���;s���H��-�����@�Kߧ�	�1�$ғ��\���I�UTRM�����]G�$S�Ӂ)T����$7��A*-�n�7o�����UG�B�����ː�C��QRK�2������*ifHख़=>��(\"��V*�Q�{[��~F��O0���_��g��EȔ,�7�(cZP9�6e�r!߈�a�k�%��aBt�(�9�����V��?�
y���cѯ�t�����Xe��H�9��r������:�Ao�G�ɾ�~y}+�����c ׵�;����1m��a�m�oL�B����I]&�CY=޼\������sܞ�iaH�Zr��SM�%����O9�A�H��cLv��A>N�|��*�3�R�F��
i|LQNS�d)�NW�b��� �n�7-46����0R�t��<"��t��m�#�o�3�rd�:8RBK��U"�q����^)�9�p���?��!�!�4��bz��'�r�t�Ļݭa��
�E�hJ����}s�	�-l���N��;����6����Q�tVo �f�BH��xi����Inl�FX|��Z�����&K5n�=y��ۯ�] �E��#R�XlL��"Yw����~�
�G��mM�_Ib6T����?�HL�b�J��(�jSbOĉÓPN�Qf�ޤ����cD�7qR�q��6bZ�ٰ��]*�'�]�g�������������ϒ��K�6�O<�5�� �����������p����[��o/��m���C]I��BM�����,QbC���Hqw�����rWܱh'9�Y�b
}Vbla��VMͿ���ɪ��bX<�������6�߲�����.݅;Z���0Ǔ^Qf���e�Uj�Lc,z��t��z�92���]l���M.�ڻ��h����-���E�V�l4\�jI`M��tU����Oc/Xe�	_��?5U'�B��s
�����M�;�q�rde��Yu��\35��ɘqj{�Z'>�L�^TH>�Mw�!pW��(��݃��S9k���d}��/����*�����ԅi��^S$�yV��q�\ֻ�)K:����~�vL�wj%k���񻣯��{��l�v(�z�go��g�w����d8i�<�$�����<'IR7]`}�{��[��[�%�Jh���(���Aޢ.�
.6k��=wU�o���f]J]��*������-q\%S.(�O��ĢF�E8!'	�
˂���|P%Թ$�#@��DDm{#�G�SR��jM�����g���ݰ�V��@� �GH.��G��WP���٘��9���.�!�7
 �L����z �f#��H�h�S��n���A����Cb�n׉r���Z䓳��g�F�����
�3�y?����:�nC�Y4x�������߁4t��8a�%�R�SԹ2Yrr�s	j�X>���n��ǑԔ��&:$$��ۖkh��{�gdt.���&I6��@��C������a�� �  ���N�2�3�$��P�6�,f�\̸��^AC%�SDu�i��F���)�p�*5/��+p�?����n<K!T�߹���\ C��d��5��iQQJ(��)�B�$OO�k�>�Nݛ`�3�3�v6��#Y�������j|UA�di�����w���Z�֠uغm	I�n"a���(I�`<R�j�a-=vM���8�4i�+�xe�5�9Q6�S"��ʳ�iAf-�����~��A�!{)�����^����w�/w���~��}�1M⼚w:���$>�o@����V������t��RA=-֚wc�A�\�]�c� �p�bxw{���!*��	�T&����d2���x�W�6��}Y�v�߮Qx�?+TD"M�eQ���MF�b�A�4�������Yj�pޤ�,�ʖ�4C�����YU�L�
)�G8J���r53
��I<Ms�eyj�-�����u�O;�]��EG��˷��}z�R��v �Ӡ�ܻ�3��Qٷ� 2��2V�ݳ^�ˣ,�{Ͼ��:Vg���N��l=��|�ٵ���Z�E��dc�l����qD�]��)4�zI�P��XC��
,�	�(�w`B���=�V�7�e��͞�����q�}ܿO)��|�V9��F�*_��	C$W2�q ���c��&�c��g��I�BS��e˦#N�k	ӕ�=��M�^v3�.�0,��׊g�<�!�	�M�qJ�ڔLBYU���Sg
ܥ6��
����fe*eQK�P���eTZ�!vڭ�h���ӫwһq�z}���}5��R�F{o���� 0��@F�T�,�Ǳܠ~�2 8�7��:-��Y��x�����\���>ؐTp�?�d�����iUJrc��8u7cB�|�MQ�9�v��;�6���Sd�]��u�s��D���\��ߍ�G��FQ��	��L�߼!�����?M7O�(�Z����e>l\�4��p�e�$�Rm�@�G$>�|�Y�V���m�k�,���8����eq����Ɨ�V�F �9��9�-���G3.�|*9=��yN�񴔨d�1�%��t�ؕpx���w�~츇����c�;��t���km��
X}R����L�5���S��LX��%'EK�d�)��H�,<_��sLcZY���Z��@R��W!�����ѿ�O?�d]dі8�Wop���8pu3||��/��<j��� �$Iߚ��e�3��Dťd�?�[�1h~⸖������M�Lw\��?\�����>۟��f��EL5x�n LS�7��[�R��EF�I=!��w)Ϝ�9s.��^$Y�b�C�Y����#�$-d�u_����X�%	XF̠��)%į�c.LH�Avh��d��D�Jz{�M�"U� ������5��0
��³u��|<������w��F���
�O"s�vcs��:�'����I��.��pno?gҶہ���W���Ⱥ�(U@�l�m�U�3��9�v��<]�M� ��BG�U}�C]��Ĕ�^;�Ev�$�F���kE�1x�� Þ�3�B��u�x�%�E�)�8=�A.Yrށp���$m���f��[wy����g:7��MPq�Y#���R����!D4r�������SU7>�񷦨&�FR^�Oق�z����V,���{���������݋w$��N�tWMs��=���!$��o�FאS8��fqd�b�q;e��g���ݜ�#�q��X��+��<��mGn��
��4ƭ��^��Op�h�\�1�H�&_����I~x0��+���c���5,k\��0���"��
Sz�b�0#QIO�-*���q0�а`Z�cU�J�5��󙞔9Q�F*�o������\j�*�\��0����I��J���v����i�w?��O��n-��K�d��=}U?;� �5���0�a\h�M�b�l����b������U�͂V�Z�0{��n���j�?[;;;��L(
      V   �  x��Mo�8��ԯ�\v/�a9�����i�tl�=�B�c�0EjIʎ�����ƹ�ʓ%����<�����yn�]C:P�Mk���@�_#�5Ś���Fm7$������vՅ�c�誖�*f����'�G�K���w��*�G���$|�}ki��[���-��mI�FÇ>;$�g��MexE:b5r�o�C�J7�X�|L��0t~�w0�B-���J�m�fdQu��	��̰l!�ٰ��Y�>��� R�T^4�<@������G�ֵ��^���[�ʫ�$�^Ǻ�!'��=#��9R��c��%oer��N�h�N�dл]q�F�R�UF�:���{��F�V7}�g8yB�<2S�[�q�P�Ά>�S̱���*��;6���|4���Kq�^a��h�+���h	mϮe����y�Fq^������4���[� ��G/F�R���_�wC���^&�%�ct��百L��e�~h�V���F�\|�n�"~������O��k�v�EY����C�V�������6�},�by$oѵ����[������YB^�ܝ�Y1�\f.-��o]��>M���;�K� ��`��N��U�ОQ�>�3QN�y29l��R�uy�4����4���r��F��d\*��uei�SQ�3��! ~c�6A�i�8�ȫ�����*�lGh5�]������nL�>�B7��}�8����ڢ���h9(L�ї���yq����ao��g��u�>睗���h�L!Ҳ+���$KE9/0-f�2xC�ǝ����	��X��l�z�pQ��j�_��E�o�3u��{@�������2�-�P��5������*7HX\�4��ܳ�ݞn�f����N`(W����Z�D�"+��kqU�E�?��ʩ      K   �   x����
�@E�ɿ�$�Nk�Z_�؂��"*؅"�H�zG(�Za��AH��@�����לw.�{ڽ��d9�$��.gP��a����%T�A�F��`l��1��kf�ˈ����cqt��|������!4�A+�Kg���y��`�Ѽ$�M���:�
i@�@�6����c��I1q��_C��ۮ#��4 l����n,����0���W-D|����      M   ]   x��;
�0Cg�0Eί$g�Tj���n9|B<��|>�&δȡ{�<�6rp5��pw�����ąFG��W(�.Թ�+�+�Ղ"�&"?���      O     x�����%+E����$���?���wLey�"[;�(�b�!�B�ڿRH�;�w�_)�������w._?�����ȯ�:�:��XG���~��S�ү�#o��_-y�]����M]V;�;G���)ᖷ!�Tw�my����/1�S
��r�����\@ޡ�����V����W&� W&O oL. �U�/�tw�*��r�u�{@y���Cv����gh�gU���ZGGƻ#ų�-W�{V���U/������.�\�=�<2yyfr�TML�A^�?�Y������Zb�_��s��oL�v��z����z��`ٔ��J�7�u�:1u�ՙ�Dv5X�-L�=NVe��vy���.o���m�-����&D^!�+Qg��_��qWw�D��D6�@Բ��5����6�X��0gj�<$��,HeW�D��]m�E�/ӏ���-����r������-��Zw��b�����1�/��D���g��䙵�����T��G�\ؗgP�4#V���A�v�7H�呅�6�p�r6L[9M���@�r���HeX5z~wr��n /�M���sԗ|f�KN�� �D�|hMbYC�̞O4��L�g���DA-���ʚ^vy�:��e:�5��J�q?�;��+�ˮ7f�����0�"���>1���3}�^Y����ʾ6���=U*��Hgfg�ʫ\@�:�U
�w�l����F�&A�Ӯ��ru=�l Z%}��ޗ=��O�<�a}���q��kE%�Y�}z�˾W:jXP�~�Py��J����T��ar.3g��a[��Α��9���� ��6��2?bੴ~������4!��ܙah��}8u�&�S�W.�ˢ��/G��� �J�T����6�Jeccb��c��
c�B��C��m�z�S��~�U��׻5)b�a�'I�Ȭ>*��]��PQ�]�� ��+m�iR��m�$4��M{!VZ�a���g����V
�êV-�L	:��ԕ������i&:5�jA3��i� `a�
@�<G� �Z���1fBf��\��x��3� ��^�D((�XdЀ߈���dNI�_����3F�qπ�$K$Y��H�ĩ* )�HV"W6^����E��v��EX#fE��X�3
/fa�!2l� Ȱ�0�@�@Kg�X&��v1��F�/y�m� `9A���3hU���r�*��,C1}����F>��/n��n�0
�?t� �K�����Zs3���
:$��E2
�M�6�k�]D�	(`�؉��2�U��cnx�����nw�� �������L��`�m��	��7�U�ݷrϮ�9�3?�{I�~fBC���j����U>׈�<��q쏕��F��c�+�ckx���ʟW_ft�/f���m�|�6a�����Y �mсr�9�ش���ycrT�l�����n4d�}4��|ɣ��˳�s�m�l���d$3�\� 9!�֣.*g�F�wC=X���Ҏ��
XR],s����ҳ�;T�ll;����~��ӛ2^rEҼ��� iv�b�)I�	��g�����FZ@��j���fgv�̈K�SԨm�c�W+�H�]�9�D�b?��
s�k��\Zμ�2�G\r���9��6g�O֬G�t�FN1���@6���is¹�a�U��v��$Ic`��ދ��� �0�N`�Yș���.o�Ud���l�yZE���pٖy�h���
�B�%uHh,uI8!���e���]�=�"A/¼NF=nԼFE�@��[f�0F�?��(:��O0S�S?�]�^�uZ��~�^����y�?{���e��8wd���=_��AlTzA�7x�mߟ�ź����2<zo��+���K�ӱ�?P�����_���1�2Z�>#�f�Q�GxND"����!��c��q��@TQ���(�2��G�s'�YH��������'d�?zAL?g�����B�6�B.2�s�d�"B^~{����ƁP@7w��2g��x��DP����B�PO-,H���n�0���i�@�� wO^�cpЌ��(v�{8V��f uBF��|�சd�*s)3o}�,pw�z�5(�z�b
�/V$41��,U�����>��#g@������=�z����\ȱA�����Ii$�c>�wԳ��'R�["`�eɈ˴���W}A=H0�#z�cC����)K������+#4��%H̘��-�EsB� ��d5ys�&�G�KA=#����w�r�qǮ$�P�~�#<z�������s����Q������, ����u�{�䃫�Ҫ����Y��פێ��7o�`?ӿ
`��R`��<zb��?S�����5��k��n�������D$f15H3���}Ee!������\w!�!�m�p�����2ԧ`{p	����`D�ী��}�f�xI�U��&�>���`clnU=H�0F,���~f?� dٌ��yd�!�#����'tУ�V�ދ�P�	��q4���_�MX�ZL{K�W#g�g �����J�/ۯ�ݞ��Q=|��4Q>Qg|:�߸8���O-���a#~]x e�;�$1;���(V�C1�I�ϭ,�I�855�ͫ�4c��Y��22͂F��4s)6λ7�o�H��p^|�{�%n� 6�L�i'�F���p����[lj�(K��\��BZ�N�9構��D��]fbV�[6on�=-�(tBl2a~�d*¾�L���ydP��W��3?�L�(���C��l��L��>���h�g�d��ʊ�����zs��������6����ㅶ�O�X��,`v�^u���Q��ʜ��O6+�~�������dK�p���g��n੯X��7v�8#��EE��w�nk<����K?�m{��l~�"���."#�!�aɺ����n��Շ�9�X�^��#"GԳ!�V�֘�n��6C޻�{�`���ӭ7»�U?w��k���[�<�ؗ�V�����޹���'?^�"[f��,Ȭ�6�cA�e�R�:	�
0�b1Q�bb&h�tŻQR��u���L����ʂRE��ccGa�}&`�dw�N����|�q���-����Im
s[�%z�+��ǥ�8��g^P0�U���R6qƛB�7���]��ς�>1�������0�C�s_!��)@݄",W\ρ/"X��,2%̍+�?���!`^���G����*"�n�E�U�'��:�^�q0���e�����q����q��l<Ke΢��Eضw���ϯ_��ϊ�y      Q   %   x�3���q�wt����2�p�C�C�}]��b���� ��/      S   k  x�e�Y��H���w�+X ��]7hDq���(��bD�_)h���NV�ϓdeq<��2`���$
P*3�<�	�0�q��YB��>,pFu5ꃇ����Y�{ }-�c�����;�y'���
f&�u�/�M�������ގ��C�?"`V)`Y�?	D�� ի/�/-�Z��G��a�`&a1����������܎�ȱ����{�ֈ�Sf �p\˜���ӟy[�,a�W_t���e���"�����<#O0�	n~�,�����Η�%��T[�Ď��C�|x�p$�Ŵ�(��h�yF��5�'�:e�SIލ�*��p�6��I*D'�2�Ձsf ��j.�}����="d0lɋ��,�����HT��;�F�|{�CI|�ϴ��`w2/zX����kn���f$����^G�TT�=j����-pVd���~�%��o/h��#0�b}���8�<3���B�����hM���3e!7�9=�_IB,�-���_7Q(+"Y����U���b�s~xlN������:��2�A���3�#�Pa�蟤���qM,Z7Z"����tx��vh����_�+����߷���8�≝�J3���>�ï���I	���#��[u0X=dc#�a@zL�қ�1V��_i�;L�^!��r�W��d	_Ӎ��B�x�`�����SZcYMFM}�QUuF#��[�(ws<n�F���������a_z��쩭���g��K��;Q���E�`iXs����z��3�|��]�� ��b{���Va��b���DxUߗIS�*�]F����P;  U����x�n��^K�� \�`��P� �;'bDsd�H��r�^�1����O���xw}��u��&x�Ϻ�?�Cs�ͬݐ�b��\��q�Z�U`��J�u�nt��_`��b��p����!����ؓ���,��S��� ��j��@����cs^�\_�{e�	~N�rA�7G6�ԿB�UPƺ!�կQk�Rߕw���խ�r�p,�a ���1}�����%����.�l���Lf��=����������yAp����RD�ϼ��C�	 ��K~W��(��}V��UcKs=����,��`o�%�T�1��ai���z8�      T   2   x�ʹ  ���+�����ׁ�"�d$:&6.�9^�W���Ո�;��     